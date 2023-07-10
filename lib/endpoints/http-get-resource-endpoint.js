import { forResourceArray } from '../http/hateoas-links.js'
import { sendNotFound } from '../http/send-http-error.js'
import { sendOk } from '../http/send-http-ok.js'
import * as _types from '../types.js'
import HttpResourceEndpoint from './http-resource-endpoint.js'

/**
 * @name GetEndpointOptions
 * @typedef GetEndpointOptions
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
     * @param {Object} options
     * @returns 
     */
    async handleRequest(req, res, { resourceIds }) {
        const resource = await this._service.get(resourceIds)
        if (resource == null) {
            return sendNotFound(res)
        } else {
            const links = forResourceArray(req, [])
            sendOk({ req, res, body: { [this._resourceName]: resource }, links })
        }
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
