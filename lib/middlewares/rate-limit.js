import { sendTooManyRequests } from '../http/send-http-error.js'
import * as _types from '../types.js'
import { logError } from '../util/index.js'

/**
 * @typedef IsIpRateLimitReachedOptions
 * @property {string} ip
 */

/**
 * @callback IsIpRateLimitReached
 * @param {IsIpRateLimitReachedOptions} options
 */

/**
 * @typedef StoreIpAccessOptions
 * @property {string} ip
 * @property {string} path
 * @property {string} accessAt
 */

/**
 * @callback StoreIpAccess
 * @param {StoreIpAccessOptions} options
 */

/**
 * @typedef RateLimitMiddlewareOptions
 * @property {string} [ipRequestHeaderName=fastly-client-ip]
 * @property {boolean} [failIfNoIpPresent=true]
 * @property {IsIpRateLimitReached} isIpRateLimitReached
 * @property {StoreIpAccess} storeIpAccess
 */

/**
 * 
 * @param {RateLimitMiddlewareOptions} [defaultRateLimitMiddlewareOptions=null] 
 * @returns {_types.MiddlewareFunction}
 */
export default function ({
    ipRequestHeaderName = 'fastly-client-ip',
    failIfNoIpPresent = true,
    isIpRateLimitReached,
    storeIpAccess,
}) {
    return async function (req, res, next) {
        const { path, headers } = req
        const accessAt = Date.now()

        const ip = headers[ipRequestHeaderName]
        if (!ip && failIfNoIpPresent) {
            logError(`Found no ip in header fastly-client-ip. Other headers available for rate limiting: ${JSON.stringify(headers)}`)
            return sendTooManyRequests(res)
        }

        return isIpRateLimitReached({ ip, accessAt }).then(reached => {
            if (reached) {
                sendTooManyRequests(res)
            } else {
                storeIpAccess({ ip, path, accessAt }).then(() => next())
            }
        })
    }
}