import * as _types from "../../types.js"

/**
 * Creates a custom validator to ensure a specific value
 * cannot be updated or created.
 * 
 * @module notAllowedForCreationFieldValidator
 * @param {_types.ValidationRule} schema 
 * @returns {_types.ValidationSchema}
 */
export const useNotAllowedDuringCreationValidator = function (schema) {
	return Object.assign(schema, {
		check,
		type: 'custom',
		optional: true,
		immutable: true,
		__validator: 'api-kit/NotAllowedForCreationValidator'
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
	if (value) {
		errors.push({ type: "fieldNoCreationViaApi", expected: schema.url, actual: value })
	}
	return value
}