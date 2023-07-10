import { forNewResource } from '../http/hateoas-links.js'
import { sendBadRequest, sendNotFound } from '../http/send-http-error.js'
import { sendOk } from '../http/send-http-ok.js'
import * as _types from '../types.js'
import HttpResourceEndpoint from './http-resource-endpoint.js'

/**
 * @name PutEndpointOptions
 * @typedef PutEndpointOptions
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
     * 
     * @protected
     * @param {_types.Request} req 
     * @param {_types.Response} res 
     * @returns {boolean} true if request handling should proceed
     */
    async validateRequestPayload(req, res) {
        const { body } = req

        if (!body) {
            return true
        }

        const validationResult = await this._validator.isValidUpdate(body, { req, res })
        if (validationResult.hasError) {
            sendBadRequest(res, validationResult.details)
            return false
        }

        return true
    }

    /**
     * 
     * @param {_types.Request} req 
     * @param {_types.Response} res 
     * @param {Object} options
     * @returns 
     */
    async handleRequest(req, res, { resourceIds }) {
        const { body } = req

        const resource = await this._service.get(resourceIds)
        if (resource == null) {
            return sendNotFound(res)
        }

        await this._service.update(resourceIds, body)

        const ref = {
            id: resourceIds.at(-1),
            alias: body.alias
        }

        const links = forNewResource(req)
        sendOk({ req, res, body: { [this._resourceName]: ref }, links })
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
