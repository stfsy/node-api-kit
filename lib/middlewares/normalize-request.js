import * as _types from '../types.js';
import { createTracer, logInfo } from '../util/index.js';

const { withOrpanedSpan } = createTracer('normalize-request-middleware', {
    filepath: import.meta.url
})

/**
 * 
 * @private
 * @param {_types.Request} request
 * @returns {_types.Request} 
 */
function removeQueryFromPath(request) {
    request.originalUrl = request.pathname = request.url = request.originalUrl.substring(0, request.originalUrl.indexOf('?'))
    return request
}

/**
 * 
 * @private
 * @param {_types.Request} request
 * @returns {_types.Request} 
 */
function removeTrailingSlash(request) {
    let { originalUrl } = request
    while (originalUrl.endsWith('/')) {
        originalUrl = originalUrl.substring(0, originalUrl.length - 1)
    }
    return request
}

/**
 * @name NormalizeRequestMiddlewareOptions
 * @typedef NormalizeRequestMiddlewareOptions
 */

/**
 * Updates the properties `request.originalUrl`, `request.pathname`, `request.url`, to ensure the properties
 * remain consistent across all requests.
 * 
 * Following checks are implemented:
 * - Remove query starting with ?
 * - Remove trailing slash
 * 
 * @example
 * // With default settings
 * import normalizeRequestMiddleware from './lib/middlewares/normalize-request.js'
 * 
 * app.use(normalizeRequestMiddleware())
 * }))
 * 
 * @module NormalizeRequestMiddleware
 * @param {NormalizeRequestMiddlewareOptions} [normalizeRequestMiddlewareOptions=null]
 * @return {_types.MiddlewareFunction}
 */
export default function () {
    logInfo('Normalize request middleware registered')

    return function (req, _res, next) {
        return withOrpanedSpan('normlize-request', (span) => {
            let { originalUrl } = req

            if (originalUrl.includes('?')) {
                const { originalUrl: newOriginalUrl } = removeQueryFromPath(req)
                span.addEvent('Query removed', {
                    before: originalUrl,
                    after: newOriginalUrl
                })
            } else {
                span.addEvent('No need to remove query', { originalUrl })
            }

            ({ originalUrl } = req)
            if (originalUrl.endsWith('/')) {
                const { originalUrl: newOriginalUrl } = removeTrailingSlash(req)
                span.addEvent('Trailing slash removed', {
                    before: originalUrl,
                    after: newOriginalUrl
                })
            } else {
                span.addEvent('No need to remove trailing slash', { originalUrl })
            }

            next()
        })
    }
}