import { createTracer } from '@discue/open-telemetry-tracing';
import * as _types from '../types.js';
import { logInfo } from '../util/index.js';
import { getPackageName } from '../util/package.js';

const { withOrphanedSpan } = createTracer({
    filepath: import.meta.url,
    spanPrefix: getPackageName()
})

/**
 * 
 * @private
 * @param {RegExp} regexp
 * @param {_types.Request} request
 * @returns {_types.Request} 
 */
function removeVersionFromPath(regExp, request) {
    const { path } = request

    // because path is a getter for pathname
    request.originalUrl = request.pathname = request.url = path.replace(regExp, '')

    return request
}

/**
 * @name DefaultVersionMiddlewareOptions
 * @typedef DefaultVersionMiddlewareOptions
 * @property {String} [defaultVersion=v1] the version string to be removed from incoming path. Ignored if defaultVersionRegExp is set.
 * @property {RegExp} [defaultVersionRegExp] optional RegExp to be used for removing the default version from the path.
 * @property {boolean} [disableSanityCheck=false] true, if sanity check of RegExp should be disabled. Set to true if you want to use a custom RegEx to remove more than the default version from path.
 */

/**
 * The default version middleware modifies the incoming path to allow for a versioned API strategy.
 * For each request, the middleware checks, if
 * - the incoming path contains the given default version
 * - if yes, the version is stripped from the incoming request object so that other middlewares see only the modified  e.g. /v1/users/create -> /users/create
 * - if not, the middleware will not modify the incoming request
 * 
 * @example
 * // With default settings
 * import defaultVersionMiddlewarwe from './lib/middlewares/default-version.js'
 * 
 * app.use(defaultVersionMiddlewarwe())
 
 * @example 
 * // With custom default version
 * import defaultVersionMiddlewarwe from './lib/middlewares/default-version.js'
 * 
 * app.use(defaultVersionMiddlewarwe({
 *   defaultVersion: 'v2'
 * }))
 * 
 * @module DefaultVersionMiddleware
 * @param {DefaultVersionMiddlewareOptions} [defaultVersionMiddlewareOptions=null]
 * @return {_types.MiddlewareFunction}
 */
export default function ({ defaultVersion = 'v1', defaultVersionRegExp, disableSanityCheck = false } = {}) {
    const regexp = defaultVersionRegExp ?? new RegExp(`^/${defaultVersion}`)
    const pattern = regexp.source

    if (!disableSanityCheck && (pattern.endsWith('*') || pattern.endsWith('+'))) {
        throw new Error(`The pattern ${pattern} in DefaultVersion middleware will lead to the whole path being replace instead of only the version element. Remove the trailing wildcard to make the middleware work.`)
    }

    logInfo('Default version middleware registered')

    return function (req, _res, next) {
        return withOrphanedSpan('replace-version', (span) => {
            const { path } = req

            if (path.includes(defaultVersion)) {
                removeVersionFromPath(regexp, req)
                span.addEvent('Replaced default version', {
                    before: path,
                    after: req.path
                })
            } else {
                span.addEvent('No need to replace default version', { path })
            }

            next()
        })
    }
}