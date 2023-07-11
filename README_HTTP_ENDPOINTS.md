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
All endpoints - except the generic base class - provide a factory function to create an instance of an endpoint.

```js

import { createDeleteEndpoint } from "../../../lib/endpoints/http-delete-resource-endpoint.js";
import { createGetAllEndpoint } from "../../../lib/endpoints/http-get-all-resource-endpoint.js";
import { createGetEndpoint } from "../../../lib/endpoints/http-get-resource-endpoint.js";
import { createPostEndpoint } from "../../../lib/endpoints/http-post-resource-endpoint.js";
import { createPutEndpoint } from "../../../lib/endpoints/http-put-resource-endpoint.js";
import service from "./service.js";
import validator from "./validator.js";

const resourceName = 'queue'

export const deleteEndpoint = createDeleteEndpoint({
    resourceName,
    service,
    validator
})

export const getAllEndpoint = createGetAllEndpoint({
    resourceName,
    service,
    validator
})

export const getEndpoint = createGetEndpoint({
    resourceName,
    service,
    validator
})

export const postEndpoint = createPostEndpoint({
    resourceName,
    service,
    validator
})

export const putEndpoint = createPutEndpoint({
    resourceName,
    service,
    validator
})
```

As the factory functions return handler methods, the return values can be used directly to register routes.

```js
import express from 'express'
import { deleteEndpoint as deleteQueue, getAllEndpoint as getAllQueues, getEndpoint as getQueue, postEndpoint as postQueue, putEndpoint as putQueue } from './queues/endpoints.js'

const app = express()

app.get('/queues', getAllQueues)
app.post('/queues', postQueue)
app.get('/queues/:queueId', getQueue)
app.put('/queues/:queueId', putQueue)
app.delete('/queues/:queueId', deleteQueue)

app.listen(7001, () => {
    console.log('Test API server running on port', 7001)
})

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
    return httpAwareErrorHandler(res, async () => {
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