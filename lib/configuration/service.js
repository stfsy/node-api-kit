/**
 * @private
 */
const ENV_VAR_PREFIX = 'API'

/**
 * @param {string} key 
 * @param {string} defaultValue 
 * @returns {string | undefined}
 * @private
 */
function getEnvVar(key, defaultValue) {
    if (process.env[key]) {
        return process.env[key]
    } else {
        return defaultValue
    }
}

/**
 * @param {string} key 
 * @param name
 * @param {string} defaultValue 
 * @returns {string | undefined}
 * @private
 */
function getApiEnvVar(name, defaultValue) {
    const key = `${ENV_VAR_PREFIX}_${name}`
    return getEnvVar(key, defaultValue)
}

/**
 * @param str
 * @param {string} key 
 * @returns {string}
 * @private
 */
function stripTrailingSlash(str) {
    if (str.endsWith('/')) {
        str = str.substring(0, str.length - 1)
    }
    return str
}

/**
 * @typedef ConditionalCallback
 * @property {Function} orElse a callback to be executed if the previous operation was not
 * @property {object} result the result of the previous operation / callback
 * @private
 */

/**
 * @param {Function} checker
 * @param {Function} callback
 * @returns {ConditionalCallback}
 * @private
 */
function ifConditionThenCallBack(checker, callback) {
    const isTruthy = checker()
    let callbackResult = null

    if (isTruthy) {
        callbackResult = callback()
    }

    return {
        orElse: (orElseCallback) => {
            if (isTruthy) {
                return callbackResult
            } else {
                return orElseCallback()
            }
        },
        result: callbackResult
    }
}

/**
 * Returns the api hostname that will be used for HATEOAS links
 * 
 * @returns {string | undefined}
 */
export const apiHostname = () => {
    return stripTrailingSlash(getApiEnvVar('HOST_BASE_URL', 'http://127.0.0.1:5001/'))
}

/**
 * Returns the api hostname that will be used for HATEOAS links
 * 
 * @returns {string | undefined}
 */
export const jsonSerializerPrivatePropertyPrefix = () => {
    return stripTrailingSlash(getApiEnvVar('JSON_SERIALIZER_PRIVATE_PROPERTY_PREFIX', '$'))
}

/**
 * Returns the frontend hostname that will be used to e.g. to redirect the user
 * 
 * @returns {string | undefined}
 */
export const frontendHostname = () => {
    return getApiEnvVar('FRONTEND_BASE_URL', 'http://127.0.0.1:8080')
}

/**
 * Returns the prefix that will be used for cookies to make sure the name does not
 * clash with other cookies
 * 
 * @returns {string | undefined}
 */
export const cookiePrefix = () => {
    return getApiEnvVar('FRONTEND_COOKIE_PREFIX', 'dsq')
}

/**
 * Returns true if NODE_ENV is set to "production"
 * 
 * @returns {boolean}
 */
export const isProd = () => {
    return getEnvVar('NODE_ENV', 'development') === 'production'
}

/**
 * Returns true if NODE_ENV is set to other value than "production"
 * 
 * @returns {boolean}
 */
export const isNonProd = () => {
    return isProd() === false
}

/**
 * Returns true if NODE_ENV is set to "development"
 * 
 * @returns {boolean}
 */
export const isDevelopment = () => {
    return getEnvVar('NODE_ENV') === 'development'
}

/**
 * Returns true if current environment is a CI/CD environment
 * 
 * @returns {boolean}
 */
export const isCiCd = () => {
    return getEnvVar('GITHUB_ACTIONS') !== undefined
}

/**
 * Executes the callback if the current environment is a production environment
 * 
 * @param {Function} callback 
 * @returns {ConditionalCallback}
 */
export const ifIsProd = (callback) => {
    return ifConditionThenCallBack(isProd, callback)
}