import * as _types from '../types.js'
import { alphabet } from '../util/resource-id.js'
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
 * @module resourceValidator
 * @param {ResourceValidatorOptions}
 * @returns {_types.Validator}
 */
export default ({
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
                useRe2StringValidator({ type: 'string', empty: false, pattern: `^[${alphabet}]{21}$` })
            ]
        }))

    return {
        /**
         * @param {Object} payload 
         * @param {_types.RequestResponse} param1 
         * @returns {Promise.<_types.ValidationResult>}
         */
        async isValidCreate(payload, { _req, _res } = {}) {
            return errorsToResult(() => putValidator(payload))
        },

        /**
         * @param {Object} payload 
         * @param {_types.RequestResponse} param1 
         * @returns {Promise.<_types.ValidationResult>}
         */
        async isValidUpdate(payload, { _req, _res } = {}) {
            return errorsToResult(() => updateValidator(payload))
        },

        /**
         * @param {String} id
         * @returns {Promise.<_types.ValidationResult>}
         */
        async isValidId(id) {
            return errorsToResult(() => resourceIdCheck({ id }))
        },

        /**
         * @param {Function} validationCallback callback running the validation. The callback function is expected to return a `ValidationResult`
         * @returns {AsyncValidationCheck}
         */
        errorsToResult,

        /**
         * @param {ValidationSchema} schema the schema to compile
         * @returns {AsyncValidationCheck}
         */
        compile(schema) {
            return validator.compile(schema)
        }
    }
}