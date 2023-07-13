# Usage
HTTP endpoints allow clients access to our services and to their data. This starter kit provides tailored abstractions for APIs and SaaS products:

The 6 abstractions are:
- `http-delete-resource-endpoint`: An endpoint for resource deletion, e.g., `DELETE /queue/1234512345`
- `http-get-all-resource-endpoint`: An endpoint to read all resources of a kind , e.g., `GET /queues`
- `http-get-resource-endpoint`: An endpoint to read a specific resource, e.g., `GET /queues/1234512345`
- `http-post-resource-endpoint`: An endpoint to create a new resource, e.g., `POST /queues`
- `http-put-resource-endpoint`: An endpoint to update a resource, e.g., `PUT /queues/1234512345`
- `http-resource-endpoint`: The generic base class for all resource endpoints

## How To Create an Endpoint
We provide a factory function that creates endpoints for `GET`, `POST`, `PUT`, `DELETE` methods. This function can be used
to create all endpoints for a domain at once.

```js
import factory from "../../../lib/endpoints/http-resource-endpoint-factory.js";
import service from "./service.js";
import validator from "./validator.js";

const resourceName = 'queue'

/**
 * @module endpointFactory
 * @param {_types.HttpFactoryOptions} options
 * @returns {_types.HttpFactoryEndpoints}
 */
export default factory({ service, validator, resourceName })
```

As the factory functions returns an object with handler methods, the return value can be used directly to register routes and endpoints.

```js
import bodyParser from 'body-parser'
import express from 'express'
import { sendNotFound } from '../../lib/http/send-http-error.js'
import queueEndpoints from './queues/endpoints.js'

export default () => {
    const app = express()

    app.use(bodyParser.json())

    app.get('/queues', queueEndpoints.getAll)
    app.post('/queues', queueEndpoints.post)
    app.get('/queues/:queueId', queueEndpoints.get)
    app.put('/queues/:queueId', queueEndpoints.put)
    app.delete('/queues/:queueId', queueEndpoints.delete)

    app.use((_, res) => {
        sendNotFound(res)
    })

    const server = app.listen(7001, () => {
        console.log('Test API server running on port', 7001)
    })

    return server
}

```

## How To Validate Incoming Requests
As shown above, all endpoint factory functions require an instance of a `validator`. When handling a request, the endpoints will then validate all available input parameters:
- If request has method `GET`, endpoints validate only the request path
- If request has method `POST`, or `PUT`, endpoints validate the request path and the request body

An excerpt of the generic endpoint base class:
```js
/**
 * 
 * @param {_types.Request} req 
 * @param {_types.Response} res 
 * @returns {boolean} true if request handling was successful
 */
async handleIncomingRequest(req, res) {
    await httpAwareErrorHandler(res, async () => {
        const isValid = await this.validateRequest(req, res)
        if (isValid) {
            const resourceIds = this.buildResourcePath(req, res)
            await this.handleRequest(req, res, { resourceIds })
        }
        return true
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
```