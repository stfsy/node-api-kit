/**
 * @typedef {import('express').Request } Request
 * @typedef {import('express').Response } Response
 * @typedef {import('express').Handler} RequestHandler
 * @typedef {import('express').Application} Application 
 * @typedef {import('express').NextFunction} NextFunction 
 * @typedef {import('express').RequestHandler} RequestHandler 
 * 
 * @callback MiddlewareFunction
 * @param {Request} request
 * @param {Response} Response
 * @param {NextFunction} nextFunction
 * 
 * @typedef {import('helmet').HelmetOptions} HelmetOptions
 *
*/

/** HttFactory
 * @typedef HttpFactoryOptions
 * @property {_types.ResourceValidator} validator the resource validator
 * @property {string} [resourceName] the resource name expect in json response like e.g. topics
 * @property {object} [service] the resource service
 *
 * @typedef HttpFactoryEndpoints
 * @property {_types.RequestHandler} delete
 * @property {_types.RequestHandler} get
 * @property {_types.RequestHandler} getAll
 * @property {_types.RequestHandler} post
 * @property {_types.RequestHandler} put
 */

/** Validation 
 * @typedef {import('fastest-validator').ValidationRule} ValidationRule
 * @typedef {import('fastest-validator').ValidationSchema} ValidationSchema
 * @typedef {import('fastest-validator').ValidationCheck} ValidationCheck
 * @typedef {import('fastest-validator').AsyncCheckFunction} AsyncValidationCheck
 * 
 * @typedef ResourceValidator
 * @property {ValidatorEventFunction} isValidCreate
 * @property {ValidatorEventFunction} isValidUpdate
 * @property {ValidatorEventFunction} isValidId
 * @property {ValidationExecutor} errorsToResult
 * @property {ValidatorCompileFunction} compile
 * 
 * @callback ValidatorEventFunction
 * @param {Object} payload the payload to validate
 * @param {RequestResponse} requestResponse an object holding the incoming request and response
 * @returns {Promise.<ValidationResult>}
 * 
 * @typedef RequestResponse
 * @property {Request} req incoming request
 * @property {Response} res incoming request
 * 
 * @callback ValidationExecutor
 * @param {Function} validationCallback callback running the validation
 * @returns {AsyncValidationCheck}
 *
 * @callback ValidatorCompileFunction
 * @param {ValidationSchema} schema the schema to compile
 * @returns {AsyncValidationCheck}
 * 
 * @typedef {ValidatorResult | HttpError} ValidationResult
 * 
 * @typedef ValidatorResult
 * @property {Boolean} hasError true, if the validation resulted in an error
 * @property {Object} details additional details describing why the validation failed
 * 
 * @callback ValidationSchemaProvider
 * @returns {ValidationSchema}
 * 
 * @typedef HttpError
 * @property {Number} [status] the http status to send to the client
 * @property {Object.<String,String>} details
*/

export default {}