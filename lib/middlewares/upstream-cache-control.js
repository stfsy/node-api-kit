import { createTracer } from '@discue/open-telemetry-tracing'
import * as _types from '../types.js'
import { logInfo } from '../util/index.js'
import { getPackageName } from '../util/package.js'

const { withOrphanedSpan } = createTracer({
    filepath: import.meta.url,
    spanPrefix: getPackageName()
})

const defaultSurrogateControlValue = 'no-store'
const defaultCacheControlValue = 'no-store, no-cache, must-revalidate, proxy-revalidate'
const defaultExpiresValue = '0'

/**
 * @typedef UpstreamCacheControlOptions
 * @property {string} [surrogateControl='no-store']
 * @property {string} [cacheControl='no-store, no-cache, must-revalidate, proxy-revalidate']
 * @property {string} [expires='0']
 */

/**
 * Will set cache control headers to prevent content with sensitive data being stored in CDNs, 
 * reverse proxies, clients etc.
 * 
 * @module UpstreamCacheControl
 * @param {UpstreamCacheControlOptions} [UpstreamCacheControlOptions=null]
 * @returns {_types.MiddlewareFunction}
 * @example 
 * // With default settings
 * import upstreamCacheControl from './lib/middlewares/upstream-cache-control.js'
 * app.use(upstreamCacheControl())
 * @example 
 * // With custom maxAge value for cacheControl
 * import upstreamCacheControl from './lib/middlewares/upstream-cache-control.js'
 * app.use(upstreamCacheControl({
 *   cacheControl: 'max-age=604800'
 * }))
 * @example 
 * // Without SurrogateControl header
 * import upstreamCacheControl from './lib/middlewares/up-streamcache-control.js'
 * 
 * app.use(upstreamCacheControl({
 *   surrogateControl: null
 * }))
 * 
 */
export default function (
    {
        surrogateControl = defaultSurrogateControlValue,
        cacheControl = defaultCacheControlValue,
        expires = defaultExpiresValue
    } = {}) {
    logInfo('Upstream cache control middleware registered')

    const headersToSet = []
    if (surrogateControl) {
        headersToSet.push({ key: 'Surrogate-Control', value: surrogateControl })
    }
    if (cacheControl) {
        headersToSet.push({ key: 'Cache-Control', value: cacheControl })
    }
    if (expires) {
        headersToSet.push({ key: 'Expires', value: expires })
    }

    return function (_request, response, nextFunction) {
        withOrphanedSpan('add-upstream-cache-control-response-headers', () => {
            headersToSet.forEach(({ key, value }) => {
                response.setHeader(key, value)
            })
        })

        return nextFunction()
    }
}