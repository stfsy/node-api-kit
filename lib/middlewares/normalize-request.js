import { createTracer } from '@discue/open-telemetry-tracing'
import * as _types from '../types.js'
import { logInfo } from '../util/index.js'
import { getPackageName } from '../util/package.js'

const { withOrphanedSpan } = createTracer({
    filepath: import.meta.url,
    spanPrefix: getPackageName()
})

/**
 * 
 * @param {_types.Request} request
 * @returns {_types.Request} 
 * @private
 */
function removeQueryFromPath(request) {
    request.originalUrl = request.pathname = request.url = request.originalUrl.substring(0, request.originalUrl.indexOf('?'))
    return request
}

/**
 * 
 * @param {_types.Request} request
 * @returns {_types.Request} 
 * @private
 */
function removeTrailingSlash(request) {
    let { originalUrl } = request
    while (originalUrl.endsWith('/')) {
        originalUrl = originalUrl.substring(0, originalUrl.length - 1)
    }
    return request
}

/**
 * Updates the properties `request.originalUrl`, `request.pathname`, `request.url`, to ensure the properties
 * remain consistent across all requests.
 * 
 * Following checks are implemented:
 * - Remove query starting with ?
 * - Remove trailing slash
 * 
 * @module NormalizeRequestMiddleware
 * @returns {_types.MiddlewareFunction}
 * @example
 * // With default settings
 * import normalizeRequestMiddleware from './lib/middlewares/normalize-request.js'
 * 
 * app.use(normalizeRequestMiddleware())
 * }))
 * 
 */
export default function () {
    logInfo('Normalize request middleware registered')

    return function (req, _res, next) {
        return withOrphanedSpan('normalize-request', (span) => {
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