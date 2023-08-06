
import { SpanStatusCode } from '@opentelemetry/api';
import { snakeCase } from 'snake-case';
import { sendBadRequest } from '../http/send-http-error.js';
import * as _types from '../types.js';
import { createTracer, httpAwareErrorHandler } from '../util/index.js';

const { withActiveSpan } = createTracer('http-resource-endpoint', {
    filepath: import.meta.url
})

/**
 * @name EndpointOptions
 * @typedef ResourceEndpointOptions
 * @property {_types.ResourceValidator} validator the resource validator
 */

/**
 * Base class for http resource endpoints. All subclasses must override the method
 * `handleRequest`.
 * 
 * @class
 * @module HttpResourceEndpoint
 * @param {ResourceEndpointOptions} args 
 */
class HttpResourceEndpoint {

    /**
     * @param {ResourceEndpointOptions} args 
     */
    constructor({ validator }) {
        /** @private */ this._validator = validator
    }

    /**
     * 
     * @param {_types.Request} req 
     * @param {_types.Response} res 
     * @returns {boolean} true if request handling was successful
     */
    async handleIncomingRequest(req, res) {
        await httpAwareErrorHandler(res, async () => {
            await withActiveSpan('handle-incoming-request', async () => {

                const isValid = await this.validateRequest(req, res)
                if (isValid) {
                    const resourceIds = this.buildResourcePath(req, res)
                    await this.handleRequest(req, res, { resourceIds })
                }

                return true
            })
        })
    }

    /**
     * Validate the incoming request. 
     * - Validates resource ideas based on declared [route params](https://expressjs.com/en/guide/routing.html#route-parameters).
     * - Validates the request body based on the requested method. This base class only
     *   validates if the request method is `POST`.
     * 
     * @protected
     * @param {Request} req 
     * @param {_types.Response} res 
     * @returns {boolean} true if request handling should proceed
     */
    async validateRequest(req, res) {
        const hasValidIds = await this.validateResourceIds(req, res)
        if (!hasValidIds) {
            return false
        }

        const hasValidPayload = await this.validateRequestPayload(req, res)
        if (!hasValidPayload) {
            return false
        }

        return true
    }


    /**
     * 
     * @protected
     * @param {_types.Request} req 
     * @param {_types.Response} res 
     * @returns {boolean} true if request handling should proceed
     */
    async validateRequestPayload(req, res) {
        return withActiveSpan('validate-request-payload', async (span) => {
            const { body, method } = req

            if (method === 'POST') {
                const validationResult = await this._validator.isValidCreate(body, { req, res })
                if (validationResult.hasError) {
                    const details = validationResult.details
                    span.addEvent('Validation failed', details)
                        .setStatus({ code: SpanStatusCode.ERROR })

                    sendBadRequest(res, details)
                    return false
                }
            }

            return true
        })
    }

    /**
     * Validate the resource ids of the incoming request
     * 
     * @protected
     * @param {_types.Request} req 
     * @param {_types.Response} res 
     * @returns {boolean} true if request handling should proceed
     */
    async validateResourceIds(req, res) {
        return withActiveSpan('validate-resource-ids', async (span) => {
            const { params } = req

            const entries = Object.entries(params)
            const idValidationErrors = {}
            for (let index = 0, n = entries.length; index < n; index++) {
                const [paramName, id] = entries[index]
                if (id) {
                    const validationResult = await this._validator.isValidId(id)
                    if (validationResult.hasError) {
                        const snakeCasedParamName = snakeCase(paramName)
                        idValidationErrors[`${snakeCasedParamName}`] = 'Must be a valid resource id.'
                    }
                }
            }

            if (Object.keys(idValidationErrors).length > 0) {
                span.addEvent('Validation failed', idValidationErrors)
                    .setStatus({ code: SpanStatusCode.ERROR })

                sendBadRequest(res, idValidationErrors)
                return false
            }

            return true
        })
    }

    /**
     * Build the path for the incoming resource path. By default uses req.params object
     * 
     * @protected
     * @param {_types.Request} req 
     * @param {_types.Response} res 
     * @returns {boolean} true if request handling should proceed
     */
    buildResourcePath(req, _res) {
        const { params } = req
        return Object.values(params)
    }

    /**
     * 
     * @abstract
     * @param {_types.Request} req 
     * @param {_types.Response} res 
     * @param {Object} options
     * @returns 
     */
    async handleRequest(_req, _res, { _resourceIds }) {
        throw new Error('Handle request not implemented')
    }
}

export default HttpResourceEndpoint