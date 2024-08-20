import * as _types from '../../types.js'
import mergeObjects from './merge-objects.js'

/**
 * Creates a custom validator to ensure a specific value
 * cannot be updated.
 * 
 * @module immutableFieldValidator
 * @param {_types.ValidationRule} [schema] 
 * @returns {_types.ValidationSchema}
 */
export const useImmutableFieldValidator = function (schema) {
	return mergeObjects(schema, {
		check,
		type: 'custom',
		__validator: 'api-kit/ImmutableFieldValidator'
	})
}

/**
 * @private
 * @param {T} value 
 * @param {Array.<String>} errors
 * @param {Object} schema 
 * @returns {T}
 */
function check(value, errors, schema) {
	if (value != null) {
		errors.push({ type: 'fieldImmutable', expected: schema.url, actual: value })
	}
	return value
}