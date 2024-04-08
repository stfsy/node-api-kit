import * as _types from '../../types.js'
import { useNotAllowedDuringCreationValidator } from '../validators/not-allowed-for-creation-field-validator.js'

/**
 * Adds default options and parameters to a given schema.
 * 
 * @param {_types.ValidationRule} schema 
 * @returns {_types.ValidationSchema}
 */
export const mergeWithDefaultSchema = (schema) => {
    return Object.assign(schema, {
        $$strict: true,
        $$async: true
    })
}

/**
 * Adds default options and parameters to a given resource schema. Use this method
 * to add defaults necessary for sensible validation.
 * 
 * @param {_types.ValidationRule} schema 
 * @returns {_types.ValidationSchema}
 */
export const mergeWithDefaultResourceSchema = (schema) => {
    if (schema.id) {
        throw new Error('Do not set id in resource schema. It will be overriden by default schema.')
    }

    const resourceSchema = Object.assign(schema, {
        id: useNotAllowedDuringCreationValidator({ immutable: true, optional: true, type: 'string' })
    })

    return mergeWithDefaultSchema(resourceSchema)
}