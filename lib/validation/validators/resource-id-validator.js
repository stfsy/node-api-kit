import * as _types from "../../types.js"
import { resourceIdAlphabet } from "../../util/resource-id.js"
import { useRe2StringValidator } from "./re2-inline-string-validator.js"

/**
 * Creates a validator for resource ids.
 * 
 * @module resourceIdValidator
 * @returns {_types.ValidationSchema}
 */
export const useResourceIdValidator = () => {
    return Object.assign(
        { '$$root': true },
        useRe2StringValidator({ type: 'string', empty: false, pattern: `^[${resourceIdAlphabet}]{21}$` }),
        { __validator: 'api-kit/ResourceIdValidator' }
    )
}