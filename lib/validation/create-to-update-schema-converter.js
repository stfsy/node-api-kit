import * as _types from '../types.js'
import { useImmutableFieldValidator } from './validators/immutable-field-validator.js'

/**
 * Converts the given schema to an update-compatible schema. 
 * Meaning: marking all required fields as optional and removing
 * all default values.
 * 
 * If a field is marked with `immutable=true`, a specific validator
 * will be added, that will not allow to update this specific field
 * 
 * @param {_types.ValidationRule} schema 
 * @returns {_types.ValidationRule}
 * @example
 * const updatedSchema = converter({
 *   name: { required: true }, // will convert this to an optional field
 *   gender: { optional: true, default: 'diverse' }, // will convert to an optional field and remove default value
 *   id: { immutable: true } // will mark this field as immutable and add validator to ensure updates are not allowed
 * })
 * 
 */
export const converter = (schema) => {
    // about next line.. idk but fixes validation error?
    schema.id = useImmutableFieldValidator({})
    return Object.entries(schema).reduce((context, [key, value]) => {
        if (value.immutable === true) {
            value = useImmutableFieldValidator(value)
        }
        if (typeof value === 'object') {
            value.optional = true
        }

        delete value.default
        context[key] = value
        return context
    }, {})
}