import * as _types from '../types.js'
import { converter as createToUpdate } from './create-to-update-schema-converter.js'
import { mergeWithDefaultSchema } from './schemas/base-schema.js'
import validator from './validator.js'
import { useResourceIdValidator } from './validators/resource-id-validator.js'

/**
 * @typedef ResourceValidatorOptions
 * @name ResourceValidatorOptions
 * @property {_types.ValidationSchema} createSchema the schema to be used for create events
 * @property {_types.ValidationSchema} updateSchema the schema to be used for update events
 * @property {string} [objectStrictErrorKey=request] a string describing the root element of the validation. Use e.g. if unknown properties are present or required properties are missing.
 */

/**
 * @name ResourceValidator
 */
class ResourceValidator {

    /**
     * 
     * @param {ResourceValidatorOptions} param0 
     */
    constructor({ createSchema, updateSchema, objectStrictErrorKey = 'request' }) {
        this._createSchema = createSchema
        this._updateSchema = updateSchema
        this._objectStrictErrorKey = objectStrictErrorKey

        if (this._createSchema) {
            this._createValidator = validator.compile(this._createSchema)
        }

        if (this._updateSchema) {
            this._updateValidator = validator.compile(this._updateSchema)
        }

        this._resourceIdValidator = validator.compile(useResourceIdValidator())
    }

    async _errorsToResult(validationCallback) {
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
                    field = this._objectStrictErrorKey
                }
                validationResult.details[field] = message
            })
        }

        return validationResult
    }

    /**
     * @param {object} payload 
     * @param {_types.RequestResponse} param1 
     * @returns {Promise.<_types.ValidationResult>}
     */
    async isValidCreate(payload, { _req, _res } = {}) {
        return this._errorsToResult(() => this._createValidator(payload))
    }

    /**
     * @param {object} payload 
     * @param {_types.RequestResponse} param1 
     * @returns {Promise.<_types.ValidationResult>}
     */
    async isValidUpdate(payload, { _req, _res } = {}) {
        return this._errorsToResult(() => this._updateValidator(payload))
    }

    /**
     * @param {string} id
     * @returns {Promise.<_types.ValidationResult>}
     */
    async isValidId(id) {
        return this._errorsToResult(() => this._resourceIdValidator(id))
    }

    /**
     * @param {_types.ValidationSchema} schema the schema to compile
     * @returns {_types.AsyncValidationCheck}
     * @private
     */
    compile(schema) {
        return validator.compile(schema)
    }
}

/**
 * @module resourceValidator
 * @param {ResourceValidatorOptions}
 * @returns {_types.ResourceValidator}
 */
export default ResourceValidator

/**
 * @module createValidatorFromSchema
 * @param {object} CreateValidatorOptions
 * @param {_types.ValidationSchemaProvider} CreateValidatorOptions.createSchemaProvider the schema used for resource creation
 * @param {_types.ValidationSchemaProvider} [CreateValidatorOptions.updateSchemaProvider=null] the schema used for resource updates. If null, the create schema will be converted to an update schema.
 * @returns {_types.ResourceValidator}
 */
export function createValidatorFromSchema({ createSchemaProvider, updateSchemaProvider }) {
    const providedCreateSchema = createSchemaProvider()
    providedCreateSchema.$$validationScope = 'create'
    // update schema has higher priority. if update schema was not provided use create schema
    const providedUpdateSchema = (createSchemaProvider ?? updateSchemaProvider)()
    if (providedUpdateSchema.$$validationScope) {
        const message = `Your \`createSchema\` leaked into your \`updateSchema\`. This can happen e.g. if you stored the \`createSchema\` in a separate variable outside of the provider. 
        Make sure your schema providers always return a new object. See https://github.com/stfsy/node-api-kit/blob/main/README_VALIDATION.md#how-to-create-a-schema.`
        throw new Error(message)
    }
    providedCreateSchema.$$validationScope = 'update'
    // if update schema was not provided and we used the create schema, we need to convert the create schema to an update schema
    const finalUpdateSchema = updateSchemaProvider ? providedUpdateSchema : createToUpdate(providedUpdateSchema)

    const createSchema = mergeWithDefaultSchema(providedCreateSchema)
    const updateSchema = mergeWithDefaultSchema(finalUpdateSchema)

    return new ResourceValidator({ createSchema, updateSchema })
}

/**
 * 
 * @param {string} name name of the message. this is the key you will use to raise the error by calling errors.push(errorName)
 * @param {string} message the message that will be added to the validation error object
 */
export function addValidationMessage(name, message) {
    validator.addMessage(name, message)
}

/**
 * 
 * @param {object} messages an object containing key value pairs
 */
export function addValidationMessages(messages) {
    Object.entries(messages).forEach(([key, value]) => {
        addValidationMessage(key, value)
    })
}