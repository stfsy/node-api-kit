import { logError, logInfo, logWarn } from "../../lib/util/logger.js";

// here we are at least checking that the implementation does not throw if we pass a string
describe('Logger', () => {
    describe('.logError', () => {
        it('logs', () => {
            logError('')
        })
    })
    describe('.logInfo', () => {
        it('logs', () => {
            logInfo('')
        })
    })
    describe('.logWarn', () => {
        it('logs', () => {
            logWarn('')
        })
    })
})