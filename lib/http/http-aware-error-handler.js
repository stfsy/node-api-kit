import * as _types from '../types.js'
import { logError } from '../util/logger.js'
import { sendInternalError, sendNotFound, sendNotImplemented, sendUnprocessableEntiy } from './send-http-error.js'

/**
 * Calls the callback function and awaits the result. Will catch any error and return a http
 * error to the client, if necessary. Makes sure no sensitive information like stack traces are leaked.
 * 
 * @module httpAwareErrorHandler
 * @param {_types.Response} res
 * @param {Function} callback
 * @returns {Promise.<any>}
 */
export const httpAwareErrorHandler = async (res, callback) => {
    try {
        const result = await callback()
        return result
    } catch (e) {
        logError(`Caught error in error handler ${e}`)
        if (e.message === 'Exists') {
            return sendUnprocessableEntiy(res, { name: 'Must not exist.' })
        } else if (e.message === 'Not Found') {
            return sendNotFound(res)
        } else if (e.message === 'Not Implemented') {
            return sendNotImplemented(res)
        } else {
            return sendInternalError(res)
        }
    }
}