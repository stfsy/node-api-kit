import * as _types from '../../types.js'
import mergeObjects from './merge-objects.js'

/**
 * Creates a custom validator to ensure a specific value
 * cannot be updated or created.
 * 
 * @module notAllowedForCreationFieldValidator
 * @param {_types.ValidationRule} [schema] 
 * @returns {_types.ValidationSchema}
 */
export const useNotAllowedDuringCreationValidator = function (schema) {
	return mergeObjects(schema, {
		check,
		type: 'custom',
		optional: true,
		immutable: true,
		__validator: 'api-kit/NotAllowedForCreationValidator'
	})
}

/**
 * @param {T} value 
 * @param {Array.<string>} errors
 * @param {object} schema 
 * @returns {T}
 * @private
 */
function check(value, errors, schema) {
	if (value != null) {
		errors.push({ type: 'fieldNoCreationViaApi', expected: schema.url, actual: value })
	}
	return value
}