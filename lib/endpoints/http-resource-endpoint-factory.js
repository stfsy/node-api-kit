import * as _types from "../types.js";
import { createDeleteEndpoint } from "./http-delete-resource-endpoint.js";
import { createGetAllEndpoint } from "./http-get-all-resource-endpoint.js";
import { createGetEndpoint } from "./http-get-resource-endpoint.js";
import { createPostEndpoint } from "./http-post-resource-endpoint.js";
import { createPutEndpoint } from "./http-put-resource-endpoint.js";

/**
 * Creates all resource endpoints for the given resourceName. The endpoints won't be mounted
 * so not accessible via HTTP.
 * 
 * @module endpointFactory
 * @param {_types.HttpFactoryOptions} options
 * @returns {_types.HttpFactoryEndpoints}
 */
export default function ({ service, validator, resourceName }) {
    return {
        delete: createDeleteEndpoint({
            resourceName,
            service,
            validator
        }),
        getAll: createGetAllEndpoint({
            resourceName,
            service,
            validator
        }),
        get: createGetEndpoint({
            resourceName,
            service,
            validator
        }),
        post: createPostEndpoint({
            resourceName,
            service,
            validator
        }),
        put: createPutEndpoint({
            resourceName,
            service,
            validator
        })
    }
}