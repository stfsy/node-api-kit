import { createTracer } from '@discue/open-telemetry-tracing'
import SpanStatusCode from '@discue/open-telemetry-tracing/status-codes'
import { forNewResource } from '../http/hateoas-links.js'
import { sendNotFound } from '../http/send-http-error.js'
import { sendOk } from '../http/send-http-ok.js'
import * as _types from '../types.js'
import { getPackageName } from '../util/package.js'
import HttpResourceEndpoint from './http-resource-endpoint.js'

const { withActiveSpan } = createTracer({
    filepath: import.meta.url,
    spanPrefix: getPackageName()
})

/**
 * @typedef PutEndpointOptions
 * @name PutEndpointOptions
 * @property {string} [resourceName] the resource name expect in json response like e.g. topics
 * @property {object} [validator] the resource validator
 * @property {object} [service] the resource service
 */

/**
 * 
 * @class
 * @param {PutEndpointOptions} options 
 */
class PutEndpoint extends HttpResourceEndpoint {

    /**
     * @param {PutEndpointOptions} options 
     */
    constructor(options) {
        super(options)

        /** @private */ this._service = options.service
        /** @private */ this._resourceName = options.resourceName
    }

    /**
     * @param {_types.Request} req
     * @param {_types.Response} res
     * @returns {Promise.<_types.ValidationResult>}
     * @private
     */
    _validate(req, res) {
        return this._validator.isValidUpdate(req.body, { req, res })
    }

    /**
     * 
     * @param {_types.Request} req 
     * @param {_types.Response} res 
     * @param {object} options
     * @param options.resourceIds
     * @returns {Promise.<void>}
     */
    async handleRequest(req, res, { resourceIds }) {
        await withActiveSpan('handle-put-request', async (span) => {
            const { body } = req

            const resource = await this._service.get(resourceIds)
            if (resource == null) {
                span.addEvent('Not found', { resourceIds })
                    .setStatus({ code: SpanStatusCode.ERROR })

                return sendNotFound(res)
            }

            await this._service.update(resourceIds, body)

            const ref = {
                id: resourceIds.at(-1),
                alias: body.alias || resource.alias
            }

            const links = forNewResource(req)
            sendOk({ req, res, body: { [this._resourceName]: ref }, links })
        })
    }
}

export default PutEndpoint

/**
 * Returns a handler function for an endpoint that will call the `update` method
 * of the given service class
 * 
 * @param {PutEndpointOptions} options 
 * @returns {object} 
 */
export function createPutEndpoint(options) {
    const instance = new PutEndpoint(options)
    return instance.handleIncomingRequest.bind(instance)
}
