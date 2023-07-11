import { createValidatorFromSchema } from '../../../lib/validation/resource-validator.js'
import schema from './schema.js'

export default createValidatorFromSchema({ createSchemaProvider: schema })