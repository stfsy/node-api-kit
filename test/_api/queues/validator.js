import * as _types from '../../../lib/types.js'
import { createValidatorFromSchema } from '../../../lib/validation/resource-validator.js'
import createSchemaProvider from './schema.js'

/**
 * @module queueValidator
 * @returns {_types.ResourceValidator}
 */
export default createValidatorFromSchema({ createSchemaProvider })