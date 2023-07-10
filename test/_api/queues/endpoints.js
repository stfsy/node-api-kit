
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