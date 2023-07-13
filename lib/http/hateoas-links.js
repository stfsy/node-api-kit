import { apiHostname } from '../configuration/service.js'
import * as _types from '../types.js'

const apiHostnameValue = apiHostname()

/**
 * Returns the absolute path of the current request. Will remove the query string and trailing slashes.
 * 
 * @private
 * @param {_types.Request} req the incoming http request
 * @returns {String}
 */
function getApiPath(req) {
    let { originalUrl } = req
    originalUrl = originalUrl.substring(1)

    if (originalUrl.includes('?')) {
        originalUrl = originalUrl.substring(0, originalUrl.indexOf('?'))
    }
    while (originalUrl.endsWith('/')) {
        originalUrl = originalUrl.substring(0, originalUrl.length - 1)
    }
    return originalUrl
}

/**
 * 
 * @param {_types.Request} req 
 * @param {Array.<String>} endpoints 
 * @returns {Object}
 */
export const forEndpoints = (req, endpoints) => {
    let originalUrl = getApiPath(req)

    const links = {
        self: {
            href: [apiHostnameValue, originalUrl].join('/')
        }
    }

    if (!endpoints) {
        return links
    }

    return endpoints.reduce((context, endpoint) => {
        let href = [apiHostnameValue]
        if (originalUrl) {
            href.push(originalUrl)
        }

        href.push(endpoint)
        context[endpoint] = {
            href: href.join('/')
        }
        return context
    }, links)
}

/**
 * Converts an array with {id, alias}-like objects into HAL links
 * 
 * @param {_types.Request} req the incoming http request
 * @param {Array.<object>} array the resource array
 * @param {boolean} stripEndpoint true if endpoint should be removed from request path
 * @returns {object} 
 */
export const forResourceArray = (req, array, stripEndpoint) => {
    let originalUrl = getApiPath(req)

    const links = {
        self: {
            href: [apiHostnameValue, originalUrl].join('/')
        }
    }

    if (stripEndpoint) {
        originalUrl = originalUrl.substring(0, originalUrl.lastIndexOf('/') - 1)
    }

    if (!array) {
        return links
    }

    return array.reduce((context, { alias, id }) => {
        let href = [apiHostnameValue]
        if (originalUrl) {
            href.push(originalUrl)
        }

        href.push(id)
        context[alias ?? id] = {
            href: href.join('/')
        }
        return context
    }, links)
}

/**
 * Creates HAL links based on the incoming request path and the given resource id
 * 
 * @param {_types.Request} req the incoming http request
 * @param {string} [id=null] the new resource id
 * @returns {object} 
 */
export const forNewResource = (req, id) => {
    const originalUrl = getApiPath(req)
    const elements = [apiHostnameValue, originalUrl]

    if (id) {
        elements.push(id)
    }
    return {
        self: {
            href: elements.join('/')
        }
    }
}

/**
 * Creates HAL links based on the incoming request path and the given object containing query parameters that describe 
 * the url of the next resource
 * 
 * @private
 * @param {_types.Request} req the incoming http request
 * @param {Object} next key-value pairs describing access to the next resource
 * @returns {object} 
 * @example
 */
export const forPagination = (req, next) => {
    const originalUrl = getApiPath(req)

    const url = [apiHostnameValue, originalUrl].join('/')
    const nextQuery = Object.entries(next).reduce((context, [key, value]) => {
        context.push(`${key}=${value}`)
        return context
    }, [])

    return {
        self: {
            href: url
        },
        next: {
            href: url + '?' + nextQuery.join('&')
        }
    }
}