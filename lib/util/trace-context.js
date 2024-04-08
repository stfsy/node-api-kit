import { AsyncLocalStorage } from 'node:async_hooks'
import * as _types from '../types.js'

const asyncLocalStorage = new AsyncLocalStorage()

/**
 * Initializes a trace context and calls the callback within the current context
 * 
 * @param {Object} store objects to be added to the local storage
 * @param {Function} callback the function to be run with tracing context
 * @returns {Promise}
 */
export function initLocalStorage(store, callback) {
    return asyncLocalStorage.run(store, callback)
}

/**
 * Resets the tracing context for current scope. After this function has returned,
 * the tracing context cannot be used any more.
 * @returns {Promise}
 */
export function resetLocalStorage() {
    return asyncLocalStorage.disable()
}

/**
 * 
 * @param {String} key the key to lookup the target value. Only lookup of flat maps and keys
 * are supported
 * @returns {Promise.<Object>}
 */
export function getFromLocalStorage(key) {
    const store = asyncLocalStorage.getStore()
    if (!store) {
        return
    }
    return store[key]
}

/**
 * Returns the `traceId` of the current trace context
 * @returns {String}
 */
export function getTraceIdFromLocalStorage() {
    return getFromLocalStorage('traceId')
}

/**
 * Returns the `req` of the current trace context
 * @returns {_types.Request}
 */
export function getRequestFromLocalStorage() {
    return getFromLocalStorage('req')
}

/**
 * Returns the `res` of the current trace context
 * @returns {_types.Response}
 */
export function getResponseFromLocalStorage() {
    return getFromLocalStorage('res')
}