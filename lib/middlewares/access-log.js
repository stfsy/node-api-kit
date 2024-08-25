import { createTracer } from '@discue/open-telemetry-tracing'
import * as _types from '../types.js'
import { getTraceIdFromLocalStorage, logError, logInfo, logWarn } from '../util/index.js'
import { getPackageName } from '../util/package.js'

const { withOrphanedSpan } = createTracer({
    filepath: import.meta.url,
    spanPrefix: getPackageName()
})

const THREE_SECONDS = 3_000
const FIVE_SECONDS = 5_000

/**
 * @param {string} level
 * @param {string} message 
 * @private
 */
function CONSOLE_LOGGER(level, message) {
    switch (level) {
        case 'info':
            return logInfo(message)
        case 'error':
            return logError(message)
        case 'warn':
            return logWarn(message)
    }
}

/**
 * @param {_types.Request} req 
 * @param {_types.Response} res 
 * @param {number} duration 
 * @returns {string}
 * @private
 */
function DEFAULT_LOG_MESSAGE_PROVIDER(req, res, duration) {
    const { originalUrl, method } = req
    const { statusCode } = res

    return [method, originalUrl, statusCode, getTraceIdFromLocalStorage(), duration + 'ms'].join(' ')
}

/**
 * @typedef AccessLogMiddlewareOptions
 * @name AccessLogMiddlewareOptions
 * @property {number} [thresholdLogWarn]
 * @property {number} [thresholdLogError]
 * @property {Function} [logMessageProvider]
 * @property {Function} [logger]
 */

/**
 * After the completion of each incoming request, the access log middleware writes a log statement. Per
 * default the log statement includes `method`, `path`, `status code`, `traceId`, `duration`.
 * 
 * **Requires** the traceContext middleware.
 * 
 * @module AccessLogMiddleware
 * @param {AccessLogMiddlewareOptions} [acccessLogMiddlewareOptions=null]
 * @returns {_types.MiddlewareFunction}
 * @example 
 * // With default settings
 * import accessLogMiddleware from './lib/middlewares/access-log.js'
 * app.use(accessLogMiddleware())
 * @example 
 * // With custom log message provider
 * import accessLogMiddleware from './lib/middlewares/access-log.js'
 * 
 * app.use(accessLogMiddleware({
 *   logMessageProvider: (req,res,duration) {
 *     return `${req.method} for path ${req.path} took ${duration}ms to complete with status ${res.statusCode}`
 *   }
 * }))
 * 
 */
export default function (
    {
        thresholdLogWarn = THREE_SECONDS,
        thresholdLogError = FIVE_SECONDS,
        logMessageProvider = DEFAULT_LOG_MESSAGE_PROVIDER,
        logger = CONSOLE_LOGGER
    } = {}
) {
    logInfo('Access log middleware registered')

    return (req, res, next) => {
        const start = Date.now()

        res.on('finish', function () {
            withOrphanedSpan('log-access', () => {
                const duration = Date.now() - start
                const message = logMessageProvider.call(null, req, res, duration)

                if (duration > thresholdLogError) {
                    logger('error', message)
                } else if (duration > thresholdLogWarn) {
                    logger('warn', message)
                } else {
                    logger('info', message)
                }
            })
        })

        next()
    }
}