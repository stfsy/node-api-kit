import { logInfo } from "./logger.js"

/**
 * Executes a callback and catches any occuring errors returning a default value.
 * 
 * @module swallow
 * @param {Function} callback the callback to execute
 * @param {T} defaultValue default value will be returned in case of a catched error
 * @returns {T}
 */
export const swallow = async (callback, defaultValue) => {
    try {
        let result = callback.apply()
        if (result.then) {
            result = await result
        }
        return result
    } catch (e) {
        logInfo(`Swallowing the following error ${e} at ${e.stack}. Will return default value ${defaultValue}`)
        return defaultValue
    }
}