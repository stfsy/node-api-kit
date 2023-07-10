import { sendTooManyRequests } from '../http/send-http-error.js'
import * as _types from '../types.js'
import { logError } from '../util/logger.js'

/**
 * @typedef IsIpRateLimitReachedOptions
 * @property {String} ip
 */

/**
 * @callback IsIpRateLimitReached
 * @param {IsIpRateLimitReachedOptions} options
 */

/**
 * @typedef StoreIpAccessOptions
 * @property {String} ip
 * @property {String} path
 * @property {String} accessAt
 */

/**
 * @callback StoreIpAccess
 * @param {StoreIpAccessOptions} options
 */

/**
 * @typedef RateLimitMiddlewareOptions
 * @property {String} [ipRequestHeaderName=fastly-client-ip]
 * @property {Boolean} [failIfNoIpPresent=true]
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

        const ip = headers[ipRequestHeaderName]
        if (!ip && failIfNoIpPresent) {
            logError(`Found no ip in header fastly-client-ip. Other headers available for rate limiting: ${JSON.stringify(headers)}`)
            return sendTooManyRequests(res)
        }

        return isIpRateLimitReached({ ip }).then(reached => {
            if (reached) {
                sendTooManyRequests(res)
            } else {
                // store this access asynchronously
                setImmediate(() => {
                    storeIpAccess({ ip, path, accessAt: Date.now() })
                })
                next()
            }
        })
    }
}