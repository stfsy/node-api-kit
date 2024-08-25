import { createTracer } from '@discue/open-telemetry-tracing'
import { forResourceArray } from '../http/hateoas-links.js'
import { sendOk } from '../http/send-http-ok.js'
import * as _types from '../types.js'
import { pluralize } from '../util/index.js'
import { getPackageName } from '../util/package.js'
import HttpResourceEndpoint from './http-resource-endpoint.js'

const { withActiveSpan } = createTracer({
    filepath: import.meta.url,
    spanPrefix: getPackageName()
})

/**
 * @typedef GetAllEndpointOptions
 * @name GetAllEndpointOptions
 * @property {string} [resourceName] the resource name expect in json response like e.g. topics
 * @property {object} [service] the resource storage
 */

/**
 * @class
 * @param {GetAllEndpointOptions} options
 */
class GetAllEndpoint extends HttpResourceEndpoint {

    /**
     * @param {GetAllEndpointOptions} options
     */
    constructor(options) {
        super(options)

        /** @private */ this._service = options.service
        /** @private */ this._resourceName = options.resourceName
        /** @private */ this._resourceNamePlural = pluralize(this._resourceName)
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
        await withActiveSpan('handle-get-request', async () => {
            const resources = await this._service.getAll(resourceIds)
            const links = forResourceArray(req, resources)
            sendOk({ req, res, body: { [this._resourceNamePlural]: resources }, links })
        })
    }
}

export default GetAllEndpoint


/**
 * Returns a handler function for an endpoint that will call the `getAll` method
 * of the given service class
 * 
 * @param {GetAllEndpointOptions} options 
 * @returns {Function} 
 */
export function createGetAllEndpoint(options) {
    const instance = new GetAllEndpoint(options)
    return instance.handleIncomingRequest.bind(instance)
}
