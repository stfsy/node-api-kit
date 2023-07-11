# Usage
This document describes how to create `validators`. `Validators` are used in conjunction with `schemas` to validate incoming http requests and are, therefore, another essential part of API security.

## Create a Validator Instance
`Validators` are responsible for the validation of incoming resources. They validate incoming path elements, http methods and request bodies. 

The most straight-forward way to create a `validator` is to use the factory method `createValidatorFromSchema`:

```js
import * as _types from '../../../lib/types.js'
import { createValidatorFromSchema } from '../../../lib/validation/resource-validator.js'
import createSchemaProvider from './schema.js'

/**
 * @module queueValidator
 * @returns {_types.ResourceValidator}
 */
export default createValidatorFromSchema({ createSchemaProvider })
```

The snippet above creates an instance of a `validator`. The `createSchemaProvider` is a function, that returns the schema object used for validation of new resource requests. As the update schema is missing in the example above, the validator will convert the given schema to an update schema. 
An update schema is a schema, that has no required, or default types. 

## Schema creation
A schema is a plain JavaScript object describing the `required`, and `optional` properties of a resource.

```js
import { useRe2StringValidator } from "../../../lib/validation/validators/re2-inline-string-validator.js";

/**
 * @typedef Queue
 * @property {String} alias
 * @property {any} data
 */

/**
 * @module queueSchema
 */
export default () => {
    return {
        alias: useRe2StringValidator({ pattern: /^[a-zA-Z0-9.\-\\/]{4,64}$/, empty: false, optional: true }),
        data: { type: 'object', empty: false, immutable: true }
    }
}
```

A property must have one of many `types`:
- array
- boolean
- class
- currency
- date
- number
- object
- string
- ... and [more](README_VALIDATION_SCHEMA.md)

Besides the `type` definition, a property can have many `directives`:
- default
- empty
- min
- max
- optional
- pattern
- ... and [more](README_VALIDATION_SCHEMA.md)

If necessary, a property can have multiple `types` and `validators`:
```js
import { useRe2StringValidator } from "../../../lib/validation/validators/re2-inline-string-validator.js";

/**
 * @typedef Id
 * @property {String} id
 */

/**
 * @module resourceIdSchema
 */
export default () => {
    return {
        id: [
            { type: 'uuid', empty: false }, // legacy uuid
            useRe2StringValidator({ type: 'string', empty: false, pattern: `^[a-zA-Z0-9]{21}$` })
        ]
    }
}
```

In the example above, a valid id is either
- a valid uuid
- or an id the matches the given pattern

Check out the [Validation Schema document](README_VALIDATION_SCHEMA.md) to read more about how to define schemas.

## Schema for Resource Update
Resource creation and update differ because during creation we might require certain fields of a resource to be present, while when during an update, we might not.

E.g. a person might need a name and an adress. So we might required name and adress to be present when a present is created. However, if this person is updated via API
then we do not have to require the name to be sent again, because it is already stored in our system.

```js
import { useRe2StringValidator } from "../../../lib/validation/validators/re2-inline-string-validator.js";

/**
 * @typedef Id
 * @property {String} id
 */

/**
 * @module resourceIdSchema
 */
export default () => {
    return {
        name: { // just a simple pattern for illustration purposes
            useRe2StringValidator({ type: 'string', empty: false, pattern: `^[a-zA-Z0-9]{21}$` })
        },
        adress: { // just a simple pattern for illustration purposes
            useRe2StringValidator({ type: 'string', empty: false, pattern: `^[a-zA-Z0-9 ]{42}$` })
        },
    }
}
```

As described above, the factory method `createValidatorFromSchema` will convert a given create schema to an update schema, if the `updateSchemaProvider` is empty. Taking the example from above, the 
`createValidatorFromSchema` will declare both the `name` and `adress` fields as optional, so that only one of them can be updated at a time.