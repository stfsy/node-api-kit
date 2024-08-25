import { createTracer } from '@discue/open-telemetry-tracing'
import SpanStatusCode from '@discue/open-telemetry-tracing/status-codes'
import { forResourceArray } from '../http/hateoas-links.js'
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
 * @typedef GetEndpointOptions
 * @name GetEndpointOptions
 * @property {string} [resourceName] the resource name expect in json response like e.g. topics
 * @property {object} [service] the resource service
 */

/**
 * @class
 * @param {GetEndpointOptions} options
 */
class GetEndpoint extends HttpResourceEndpoint {

    /**
     * @param {GetEndpointOptions} options
     */
    constructor(options) {
        super(options)

        /** @private */ this._service = options.service
        /** @private */ this._resourceName = options.resourceName
    }

    /**
     * 
     * @param {_types.Request} req 
     * @param {_types.Response} res 
     * @param {object} options
     * @param options.resourceIds
     * @returns 
     */
    async handleRequest(req, res, { resourceIds }) {
        return withActiveSpan('handle-get-request', async (span) => {
            const resource = await this._service.get(resourceIds)
            if (resource == null) {
                span.addEvent('Not found').setStatus(SpanStatusCode.ERROR)
                return sendNotFound(res)
            } else {
                const links = forResourceArray(req, [])
                sendOk({ req, res, body: { [this._resourceName]: resource }, links })
            }

            span.end()
        })
    }
}

export default GetEndpoint

/**
 * Returns a handler function for an endpoint that will call the update `get`
 * of the given service class
 * 
 * @param {EndpointOptions} options 
 * @returns {Function} 
 */
export function createGetEndpoint(options) {
    const instance = new GetEndpoint(options)
    return instance.handleIncomingRequest.bind(instance)
}
