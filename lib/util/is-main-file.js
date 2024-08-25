import { fileURLToPath } from 'node:url'

/**
 * Executes the callback, if the callee was used as an entry point to the application.
 * 
 * Pass either the the require object when using Commonjs, or importMeta: import.meta if using 
 * ES modules
 * 
 * @param {object} options
 * @param {Function} options.require `require` function in case CommonJS modules are used
 * @param {object} options.importMeta `import.meta` in case ES6 modules are used
 */
export const isMainFile = ({ require, importMeta }) => {
    if (!importMeta && require?.main === module) {
        return true
    } else if (importMeta.url.startsWith('file:')) {
        const modulePath = fileURLToPath(importMeta.url)
        return process.argv[1] === modulePath
    }

    return false
}

/**
 * Executes the callback, if the callee was used as an entry point to the application.
 * 
 * Pass either the the require object when using Commonjs, or importMeta: import.meta if using 
 * ES modules
 * 
 * @param {object} options
 * @param {Function} options.require `require` function in case CommonJS modules are used
 * @param {object} options.importMeta `import.meta` in case ES6 modules are used
 * @param callback
 */
export const ifIsMainFile = ({ require, importMeta }, callback) => {
    if (isMainFile({ require, importMeta })) {
        callback()
    }
}