import * as _types from '../types.js'
import { resourceIdAlphabet } from '../util/index.js'
import { converter as createToUpdate } from './create-to-update-schema-converter.js'
import { mergeWithDefaultSchema } from './schemas/base-schema.js'
import validator from './validator.js'
import { useRe2StringValidator } from './validators/re2-inline-string-validator.js'

/**
 * @name ResourceValidatorOptions
 * @typedef ResourceValidatorOptions
 * @param {_types.ValidationSchema} createSchema the schema to be used for create events
 * @param {_types.ValidationSchema} updateSchema the schema to be used for update events
 * @param {String} [objectStrictErrorKey=request] a string describing the root element of the validation. Use e.g. if unknown properties are present or required properties are missing.
 */

/**
 * @private
 */
const validatorFn = ({
    createSchema, updateSchema,
    // this key is used if the validator finds an object with unknown properties
    // in that case in our api we want to use the key "request" to show the caller
    // the request contained an unknown property
    // however for i.e. nested properties we might want to use the parent objects name
    // in that case we can then set the property's value to null
    objectStrictErrorKey = 'request'
}) => {

    let putValidator
    if (createSchema) {
        putValidator = validator.compile(createSchema)
    }

    let updateValidator
    if (updateSchema) {
        updateValidator = validator.compile(updateSchema)
    }

    const errorsToResult = async (validationCallback) => {
        let callbackResult = await validationCallback()
        const validationResult = {
            hasError: false,
            details: {}
        }
        if (Array.isArray(callbackResult)) {
            validationResult.hasError = true
            callbackResult.forEach(({ field, type, message }) => {
                if (type === 'objectStrict' && !field) {
                    // set the default strict error key
                    // this happens if there's an unknown property at the root of 
                    // the validated object
                    field = objectStrictErrorKey
                }
                validationResult.details[field] = message
            })
        }

        return validationResult
    }

    const resourceIdCheck = validator.compile(
        mergeWithDefaultSchema({
            id: [
                { type: 'uuid', empty: false }, // legacy uuid
                useRe2StringValidator({ type: 'string', empty: false, pattern: `^[${resourceIdAlphabet}]{21}$` })
            ]
        }))

    return {
        /**
         * @private
         * @param {Object} payload 
         * @param {_types.RequestResponse} param1 
         * @returns {Promise.<_types.ValidationResult>}
         */
        async isValidCreate(payload, { _req, _res } = {}) {
            return errorsToResult(() => putValidator(payload))
        },

        /**
         * @private
         * @param {Object} payload 
         * @param {_types.RequestResponse} param1 
         * @returns {Promise.<_types.ValidationResult>}
         */
        async isValidUpdate(payload, { _req, _res } = {}) {
            return errorsToResult(() => updateValidator(payload))
        },

        /**
         * @private
         * @param {String} id
         * @returns {Promise.<_types.ValidationResult>}
         */
        async isValidId(id) {
            return errorsToResult(() => resourceIdCheck({ id }))
        },

        /**
         * @private
         * @param {Function} validationCallback callback running the validation. The callback function is expected to return a `ValidationResult`
         * @returns {AsyncValidationCheck}
         */
        errorsToResult,

        /**
         * @private
         * @param {ValidationSchema} schema the schema to compile
         * @returns {AsyncValidationCheck}
         */
        compile(schema) {
            return validator.compile(schema)
        }
    }
}

/**
 * @module resourceValidator
 * @param {ResourceValidatorOptions}
 * @returns {_types.ResourceValidator}
 */
export default validatorFn

/**
 * @module createValidatorFromSchema
 * @param {Object} CreateValidatorOptions
 * @param {_types.ValidationSchemaProvider} CreateValidatorOptions.createSchemaProvider the schema used for resource creation
 * @param {_types.ValidationSchemaProvider} [CreateValidatorOptions.updateSchemaProvider=null] the schema used for resource updates. If null, the create schema will be converted to an update schema.
 * @returns {_types.ResourceValidator}
 */
export function createValidatorFromSchema({ createSchemaProvider, updateSchemaProvider }) {
    const providedCreateSchema = createSchemaProvider()
    // update schema has higher priority. if update schema was not provided use create schema
    const providedUpdateSchema = (createSchemaProvider ?? updateSchemaProvider)()
    // if update schema was not provided and we used the create schema, we need to convert the create schema to an update schema
    const finalUpdateSchema = updateSchemaProvider ? providedUpdateSchema : createToUpdate(providedUpdateSchema)

    const createSchema = mergeWithDefaultSchema(providedCreateSchema)
    const updateSchema = mergeWithDefaultSchema(finalUpdateSchema)

    return validatorFn({ createSchema, updateSchema })
}