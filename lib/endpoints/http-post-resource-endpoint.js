import { forNewResource } from '../http/hateoas-links.js'
import { sendOk } from '../http/send-http-ok.js'
import * as _types from '../types.js'
import { newResourceId } from '../util/resource-id.js'
import { createTracer } from '../util/tracing.js'
import HttpResourceEndpoint from './http-resource-endpoint.js'

const { withActiveSpan } = createTracer('http-post-resource-endpoint', {
    filepath: import.meta.url
})

/**
 * @name PostEndpointOptions
 * @typedef PostEndpointOptions
 * @property {string} [resourceName] the resource name expect in json response like e.g. topics
 * @property {object} [validator] the resource validator
 * @property {object} [service] the resource service
 */

/**
 * @class
 * @param {PostEndpointOptions} options 
 */
class PostEndpoint extends HttpResourceEndpoint {

    /**
     * @param {PostEndpointOptions} options
     */
    constructor(options) {
        super(options)

        /** @private */ this._resourceName = options.resourceName
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
        await withActiveSpan('handle-post-request', async () => {

            const { body } = req
            const childId = newResourceId()

            const ids = []
            ids.push(...resourceIds)
            ids.push(childId)

            await this._service.create(ids, { id: childId, ...body })

            const ref = {
                id: childId,
                alias: body.alias
            }

            const links = forNewResource(req, childId)

            sendOk({ req, res, body: { [this._resourceName]: ref }, links })
        })
    }
}

export default PostEndpoint

/**
 * Returns a handler function for an endpoint that will call the `create` method
 * of the given service class
 * 
 * @param {PostEndpointOptions} options 
 * @returns {Function} 
 */
export function createPostEndpoint(options) {
    const instance = new PostEndpoint(options)
    return instance.handleIncomingRequest.bind(instance)
}
