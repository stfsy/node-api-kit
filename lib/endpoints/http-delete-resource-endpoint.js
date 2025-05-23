import { createTracer } from '@discue/open-telemetry-tracing'
import SpanStatusCode from '@discue/open-telemetry-tracing/status-codes'
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
 * @typedef DeleteEndpointOptions
 * @name DeleteEndpointOptions
 * @property {string} resourceName the resource name expect in json response like e.g. topics
 * @property {object} service the resource storage
 */

/** 
 * @class
 * @param {DeleteEndpointOptions} options 
 */
class DeleteEndpoint extends HttpResourceEndpoint {

    /**
     * @param {DeleteEndpointOptions} options 
     */
    constructor(options) {
        super(options)

        /** @private */ this._service = options.service
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
        await withActiveSpan('handle-delete-request', async (span) => {
            const resource = await this._service.get(resourceIds)
            if (resource == null) {
                span.addEvent('Not found', { resourceIds })
                    .setStatus({ code: SpanStatusCode.ERROR })

                return sendNotFound(res)
            } else {
                await this._service.delete(resourceIds)
                sendOk({ req, res, body: {}, links: {} })
            }
        })
    }
}

export default DeleteEndpoint

/**
 * Returns a handler function for an endpoint that will call the `delete` method
 * of the given service class
 * 
 * @param {DeleteEndpointOptions} options 
 * @returns {Function} 
 */
export function createDeleteEndpoint(options) {
    const instance = new DeleteEndpoint(options)
    return instance.handleIncomingRequest.bind(instance)
}
