import { sendNotFound } from '../http/send-http-error.js'
import { sendOk } from '../http/send-http-ok.js'
import * as _types from '../types.js'
import HttpResourceEndpoint from './http-resource-endpoint.js'

/**
 * @name DeleteEndpointOptions
 * @typedef DeleteEndpointOptions
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
     * @param {Object} options
     * @returns 
     */
    async handleRequest(req, res, { resourceIds }) {
        const resource = await this._service.get(resourceIds)
        if (resource == null) {
            return sendNotFound(res)
        } else {
            await this._service.delete(resourceIds)
            sendOk({ req, res })
        }
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
