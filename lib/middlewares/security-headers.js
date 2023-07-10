import helmet from 'helmet'
import * as _types from '../types.js'
import { logInfo } from '../util/logger.js'

const DEFAULT_OPTIONS = {
    crossOriginOpenerPolicy: { policy: 'same-origin' },
    frameguard: { action: 'DENY' },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    hidePoweredBy: true
}

/**
 * The security headers middleware adds additional security-relevant headers to each response.
 * 
 * @example 
 * // With default settings
 * import securityHeadersMiddleware from './lib/middlewares/security-headers.js'
 * 
 * app.use(securityHeadersMiddleware())
 
 * @example 
 * // With custom content security policy
 * import securityHeadersMiddleware from './lib/middlewares/security-headers.js'
 * 
 * app.use(securityHeadersMiddleware({
 *  contentSecurityPolicy: {
 *    directives: {
 *      "default-src": ["'none'"],
 *      "style-src": "'self'",
 *      "font-src": "'self'",
 *      "frame-ancestors": ['none']
 *    }
 *  },
 * })) 
 * 
 * @module SecurityHeadersMiddleware
 * @param {_types.HelmetOptions} [securityHeadersMiddlewareOptions=null]
 * @return {_types.MiddlewareFunction}
*/
export default function (securityHeadersMiddlewareOptions) {
    logInfo('Security headers middleware registered')

    const helmetOptions = securityHeadersMiddlewareOptions ?? DEFAULT_OPTIONS
    return helmet(helmetOptions)
}