
import createResourceEndpoints from "../../endpoints/http-resource-endpoint-factory.js";
import service from "./service.js";
import validator from "./validator.js";

const resourceName = 'book'

export default createResourceEndpoints({ service, validator, resourceName })