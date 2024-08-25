import { useRe2StringValidator } from '../../../lib/validation/validators/re2-inline-string-validator.js'

/**
 * @typedef Queue
 * @property {string} alias
 * @property {string} author
 * @property {string} title
 */

/**
 * @module bookSchema
 */
export default () => {
    return {
        alias: useRe2StringValidator({ pattern: /^[a-zA-Z0-9.\-\\/]{4,64}$/, empty: false, optional: true }),
        author: useRe2StringValidator({ pattern: /^[a-zA-Z0-9.\-\\/]{4,64}$/, empty: false, optional: true }),
        title: useRe2StringValidator({ pattern: /^[a-zA-Z0-9.\-\\/]{4,64}$/, empty: false, optional: true }),

    }
}