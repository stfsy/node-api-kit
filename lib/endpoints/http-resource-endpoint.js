
import { createTracer } from '@discue/open-telemetry-tracing';
import { SpanStatusCode } from '@opentelemetry/api';
import { snakeCase } from 'snake-case';
import { httpAwareErrorHandler } from '../http/index.js';
import { sendBadRequest, sendHttpError } from '../http/send-http-error.js';
import * as _types from '../types.js';
import { getPackageName } from '../util/package.js';

const { withActiveSpan } = createTracer({
    filepath: import.meta.url,
    spanPrefix: getPackageName()
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
     * - validates if the request method is `POST`.
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
            const { headers, body } = req

            // an attacker could sent 0 or no content length
            // let's validate body even if we have no content-length
            if (headers['content-length'] || Object.keys(body).length) {
                const validationResult = await this._validate(req, res)
                if (validationResult.hasError) {
                    this._handleValidationError(res, validationResult)
                    const details = validationResult.details
                    span.addEvent('Validation failed', details)
                        .setStatus({ code: SpanStatusCode.ERROR })
                    return false
                }
            }

            return true
        })
    }

    /**
     * @private
     * @param {_types.Request} req
     * @param {_types.Response} res
     * @returns {Promise.<_types.ValidationResult}
     */
    _validate(req, res) {
        return this._validator.isValidCreate(req.body, { req, res })
    }

    /**
     * @private
     * @param {_types.Response} res
     * @param {_types.ValidationResult} validationResult
     */
    _handleValidationError(res, validationResult) {
        if (validationResult.status) {
            sendHttpError(res, String(validationResult.status), validationResult.details)
        } else {
            sendBadRequest(res, validationResult.details)
        }
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
     * @returns {Array.<String>} 
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