/**
 * @private
 * @callback AsyncFunction
 * @returns {Promise}
 */

/**
 * Helper function that allows to cache an intermediate value. The provider function will be called
 * only once. For all following calls, the provider will be skipped and only the provider's result 
 * will be returned. 
 * 
 * @param {Function} provider
 * @returns {AsyncFunction}
 * 
 * @example
 * import { asyncCacheable } from './cacheable.js'
 * import { fetchData } from '../fetch/prices.js'
 * 
 * // create the cache object
 * const priceCache = asyncCacheable(async () => {
 *     return fetchData()
 * })
 * 
 * // fetchData or get from cache
 * const prices = await priceCache()
 */
const asyncCacheable = (provider) => {
    let result = null
    return async () => {
        if (!result) {
            result = await provider()
        }
        return result
    }
}

/**
 * Helper function that allows to cache an intermediate value. The provider function will be called
 * only once. For all following calls, the provider will be skipped and only the provider's result 
 * will be returned.
 * 
 * @param {Function} provider
 * @returns {Function}
 * 
 * @example
 * import { syncCacheable } from './cacheable.js'
 * import { setup } from '../costly-environment-setup.js'
 * 
 * // create the cache object
 * const setupCache = asyncCacheable(() => {
 *     setup()
 *     return true
 * })
 * 
 * // setup function will only be called once
 * setupCache()
 */
const syncCacheable = (provider) => {
    let result = null
    return () => {
        if (!result) {
            result = provider()
        }
        return result
    }
}

export default asyncCacheable
export const async = asyncCacheable
export const sync = syncCacheable