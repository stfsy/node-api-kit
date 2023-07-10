import { converter as createToUpdateSchemaConverter } from '../../../lib/validation/create-to-update-schema-converter.js'
import nestedResourceValidator from '../../../lib/validation/resource-validator.js'
import { mergeWithDefaultResourceSchema } from '../../../lib/validation/schemas/base-schema.js'
import { useRe2StringValidator } from '../../../lib/validation/validators/re2-inline-string-validator.js'

const createSchema = () => {
    return mergeWithDefaultResourceSchema({
        alias: useRe2StringValidator({ pattern: /^[a-zA-Z0-9.\-\\/]{4,64}$/, empty: false, optional: true }),
        data: { type: 'object', empty: false, immutable: true }
    })
}

const updateSchema = createToUpdateSchemaConverter(createSchema())

export default nestedResourceValidator({ createSchema: createSchema(), updateSchema })