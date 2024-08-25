
/**
 * @typedef {import('express').Request } Request
 * @typedef {import('express').Response } Response
 * @typedef {import('express').Handler} RequestHandler
 * @typedef {import('express').Application} Application 
 * @typedef {import('express').NextFunction} NextFunction 
 * @typedef {import('express').RequestHandler} RequestHandler 
 * @typedef {import('helmet').HelmetOptions} HelmetOptions
 * @callback MiddlewareFunction
 * @param {Request} request
 * @param {Response} Response
 * @param {NextFunction} nextFunction
 * 
 */

/**
 * HttFactory
 * @typedef HttpFactoryOptions
 * @typedef HttpFactoryEndpoints
 * @property {_types.ResourceValidator} validator the resource validator
 * @property {string} [resourceName] the resource name expect in json response like e.g. topics
 * @property {object} [service] the resource service
 * @property {_types.RequestHandler} delete
 * @property {_types.RequestHandler} get
 * @property {_types.RequestHandler} getAll
 * @property {_types.RequestHandler} post
 * @property {_types.RequestHandler} put
 */

/**
 * Validation 
 * @typedef {import('fastest-validator').ValidationRule} ValidationRule
 * @typedef {import('fastest-validator').ValidationSchema} ValidationSchema
 * @typedef {import('fastest-validator').ValidationCheck} ValidationCheck
 * @typedef {import('fastest-validator').AsyncCheckFunction} AsyncValidationCheck
 * @typedef ResourceValidator
 * @typedef RequestResponse
 * @typedef {ValidatorResult | HttpError} ValidationResult
 * @typedef ValidatorResult
 * @typedef HttpError
 * @callback ValidatorEventFunction
 * @callback ValidationExecutor
 * @callback ValidatorCompileFunction
 * @callback ValidationSchemaProvider
 * @param {object} payload the payload to validate
 * @param {RequestResponse} requestResponse an object holding the incoming request and response
 * @param {Function} validationCallback callback running the validation
 * @param {ValidationSchema} schema the schema to compile
 * @property {ValidatorEventFunction} isValidCreate
 * @property {ValidatorEventFunction} isValidUpdate
 * @property {ValidatorEventFunction} isValidId
 * @property {ValidationExecutor} errorsToResult
 * @property {ValidatorCompileFunction} compile
 * @property {Request} req incoming request
 * @property {Response} res incoming request
 * @property {boolean} hasError true, if the validation resulted in an error
 * @property {object} details additional details describing why the validation failed
 * @property {number} [status] the http status to send to the client
 * @returns {Promise.<ValidationResult>}
 * @returns {AsyncValidationCheck}
 * @returns {AsyncValidationCheck}
 * @returns {ValidationSchema}
 * 
 */

export default {}