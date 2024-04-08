import RE2 from 're2'
import * as _types from '../../types.js'
import mergeObjects from './merge-objects.js'

/**
 * A custom implementation of the string validator. Uses [re2](https://www.npmjs.com/package/re2) under the hood
 * to prevent denial of service attacks.
 * 
 * @module re2InlineStringValidator
 * @param {_types.ValidationRule} [schema] 
 * @returns {_types.ValidationSchema}
 */
export const useRe2StringValidator = function (schema) {
	return mergeObjects(schema, {
		check,
		type: 'custom'
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
	var len = value.length

	if (typeof value !== 'string') {
		errors.push({ type: 'string', actual: 'value' })
		return value
	}

	if (schema.empty === false) {
		if (len === 0) {
			errors.push({ type: 'stringEmpty', actual: 'value' })
		}
	} else if (schema.empty === true) {
		if (len === 0) {
			return value
		}
	}

	if (schema.min != null) {
		if (len < schema.min) {
			errors.push({ type: 'stringMin', expected: schema.min, actual: 'len' })
		}
	}

	if (schema.max != null) {
		if (len > schema.max) {
			errors.push({ type: 'stringMax', expected: schema.max, actual: 'len' })
		}
	}

	if (schema.length != null) {
		if (len !== schema.length) {
			errors.push({ type: 'stringLength', expected: schema.length, actual: 'len' })
		}
	}

	if (schema.pattern != null) {
		const pattern = new RE2(schema.pattern)
		if (!pattern.test(value)) {
			errors.push({
				type: 'stringPattern', expected: pattern.toString(), actual: 'origValue'
			})
		}
	}

	if (schema.enum != null) {
		if (!schema.enum.includes(value)) {
			errors.push({ type: 'stringEnum', expected: '\'' + schema.enum.join(', ') + '\'', actual: 'origValue' })
		}
	}

	if (schema.lowercase === true) {
		value = value.toLowerCase()
	}

	return value
}