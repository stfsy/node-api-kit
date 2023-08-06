import * as _types from '../types.js';
import { initLocalStorage, logInfo, newResourceId, resetLocalStorage } from '../util/index.js';

/**
 * Can be used to add additional information to the trace context. All values of returned
 * object will be merged with the default trace context. The returned object will have
 * higher priority, overriding the default context values.
 * 
 * @name TraceContextProviderFunction
 * @typedef TraceContextProviderFunction
 * @param {_types.Request} req
 * @param {_types.Response} res
 * @returns { Object }
 */

/**
 * @private
 */
function NO_OP() { }

/**
 * Returns the trace context. The trace context will be available to other
 * application components, modules and function.
 * 
 * The `default` implementation adds the following keys and values to the context
 * - `traceId`: A pseudo-random id that allows to identify each request
 * - `req`: The incoming request
 * - `res`: The incoming response
 * 
 * @private
 * @param {_types.Request} req 
 * @param {_types.Response} res 
 * @returns {Object}
 */
function defaultContextProvider(req, res) {
    return { traceId: newResourceId(), req, res }
}

/**
 * @name TraceContextMiddlewareOptions
 * @typedef TraceContextMiddlewareOptions
 * @property {Function} [traceContextProvider]
 */

/**
 * The trace context middleware provides tracing information to other application components.
 * By default, the middleware will add a pseudo-random `traceId`, the incoming `request` as `req`
 * and `response` as `res` to the trace context. All three values can then be used by e.g.
 * loggers to allow correlating log statements and incoming requests.
 * 
 * @example 
 * // With default settings
 * import traceContextMiddleware from './lib/middlewares/trace-context.js'
 * 
 * app.use(traceContextMiddleware())
 
 * @example 
 * // With custom trace context provider
 * import traceContextMiddleware from './lib/middlewares/trace-context.js'
 * import { randomUUID as uuid } from 'node:crypto'
 * 
 * app.use(traceContextMiddleware({
 *   traceContextProvider: (req, res) => {
 *     return { myCustomTraceId: uuid() }
 *   }
 * }))
 * 
 * @module TraceContextMiddleware
 * @param {TraceContextMiddlewareOptions} [traceContextMiddlewareOptions=null]
 * @return {_types.MiddlewareFunction}
 */
export default function ({ traceContextProvider = NO_OP } = {}) {
    logInfo('Trace context middleware registered')

    return function (req, res, next) {
        const traceContext = defaultContextProvider(req, res)
        Object.assign(traceContext, traceContextProvider(req, res))

        initLocalStorage(traceContext, () => {
            res.on('finish', function () {
                resetLocalStorage()
            })
            next()
        })
    }
}