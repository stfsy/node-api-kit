import pino from 'pino';
const logger = pino({
    transport: {
        target: 'pino-pretty'
    },
    level: 'debug'
})

export const logDebug = (message) => {
    logger.debug(message)
}

export const logInfo = (message) => {
    logger.info(message)
}

export const logWarn = (message) => {
    logger.warn(message)
}

export const logError = (message) => {
    logger.error(message)
}