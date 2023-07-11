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