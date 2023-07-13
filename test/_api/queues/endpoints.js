
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