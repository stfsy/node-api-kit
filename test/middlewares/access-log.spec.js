import { expect } from 'chai'
import accessLogMiddleware from '../../lib/middlewares/access-log.js'
import requestMock from "./request-mock.js"
import responseMock from "./response-mock.js"

describe('AccessLogMiddleware', () => {
    const actualConsoleError = console.error
    const actualConsoleInfo = console.info
    const actualConsoleWarn = console.warn

    before(() => {
        console.error = function (...args) { this._lastConsoleErrorArgs = args }
        console.info = function (...args) { this._lastConsoleInfoArgs = args }
        console.warn = function (...args) { this._lastConsoleWarnArgs = args }
    })

    beforeEach(() => {
        console._lastConsoleErrorArgs = null
        console._lastConsoleInfoArgs = null
        console._lastConsoleWarnArgs = null
    })

    after(() => {
        console.error = actualConsoleError
        console.info = actualConsoleInfo
        console.warn = actualConsoleWarn
    })

    describe('with default settings', () => {
        let request = requestMock({ method: 'GET', originalUrl: '/v1/users' })
        let response = responseMock({ statusCode: 123 })

        beforeEach(() => {
            request = requestMock({ method: 'GET', originalUrl: '/v1/users' })
            response = responseMock({ statusCode: 123 })
        })

        it('logs to console with level info', () => {
            const handler = accessLogMiddleware()
            handler(request, response, () => { })
            response._trigger('finish')

            const infoArgs = console._lastConsoleInfoArgs
            const errorArgs = console._lastConsoleErrorArgs
            const warnArgs = console._lastConsoleWarnArgs
            expect(infoArgs.at(0)).to.contain('GET /v1/users 123')
            expect(errorArgs).to.be.null
            expect(warnArgs).to.be.null
        })

        it('logs to console with level warn', async () => {
            const handler = accessLogMiddleware()
            handler(request, response, () => { })
            await new Promise((resolve) => setTimeout(resolve, 3500))
            response._trigger('finish')

            const infoArgs = console._lastConsoleInfoArgs
            const errorArgs = console._lastConsoleErrorArgs
            const warnArgs = console._lastConsoleWarnArgs
            expect(warnArgs.at(0)).to.contain('GET /v1/users 123')
            expect(errorArgs).to.be.null
            expect(infoArgs).to.be.null
        })

        it('logs to console with level error', async () => {
            const handler = accessLogMiddleware()
            handler(request, response, () => { })
            await new Promise((resolve) => setTimeout(resolve, 5500))
            response._trigger('finish')

            const infoArgs = console._lastConsoleInfoArgs
            const errorArgs = console._lastConsoleErrorArgs
            const warnArgs = console._lastConsoleWarnArgs
            expect(errorArgs.at(0)).to.contain('GET /v1/users 123')
            expect(warnArgs).to.be.null
            expect(infoArgs).to.be.null
        })
    })

    describe('with custom threshold setting', () => {
        let request = requestMock({ method: 'GET', originalUrl: '/v1/users' })
        let response = responseMock({ statusCode: 123 })

        beforeEach(() => {
            request = requestMock({ method: 'GET', originalUrl: '/v1/users' })
            response = responseMock({ statusCode: 123 })
        })

        it('logs to console with level info', () => {
            const handler = accessLogMiddleware({
                thresholdLogError: 500,
                thresholdLogWarn: 250
            })
            handler(request, response, () => { })
            response._trigger('finish')

            const infoArgs = console._lastConsoleInfoArgs
            const errorArgs = console._lastConsoleErrorArgs
            const warnArgs = console._lastConsoleWarnArgs
            expect(infoArgs.at(0)).to.contain('GET /v1/users 123')
            expect(errorArgs).to.be.null
            expect(warnArgs).to.be.null
        })

        it('logs to console with level warn', async () => {
            const handler = accessLogMiddleware({
                thresholdLogError: 500,
                thresholdLogWarn: 250
            })
            handler(request, response, () => { })
            await new Promise((resolve) => setTimeout(resolve, 333))
            response._trigger('finish')

            const infoArgs = console._lastConsoleInfoArgs
            const errorArgs = console._lastConsoleErrorArgs
            const warnArgs = console._lastConsoleWarnArgs
            expect(warnArgs.at(0)).to.contain('GET /v1/users 123')
            expect(errorArgs).to.be.null
            expect(infoArgs).to.be.null
        })

        it('logs to console with level error', async () => {
            const handler = accessLogMiddleware({
                thresholdLogError: 500,
                thresholdLogWarn: 250
            })
            handler(request, response, () => { })
            await new Promise((resolve) => setTimeout(resolve, 888))
            response._trigger('finish')

            const infoArgs = console._lastConsoleInfoArgs
            const errorArgs = console._lastConsoleErrorArgs
            const warnArgs = console._lastConsoleWarnArgs
            expect(errorArgs.at(0)).to.contain('GET /v1/users 123')
            expect(warnArgs).to.be.null
            expect(infoArgs).to.be.null
        })
    })

    describe('with custom threshold setting', () => {
        let request = requestMock({ method: 'GET', originalUrl: '/v1/users' })
        let response = responseMock({ statusCode: 123 })

        beforeEach(() => {
            request = requestMock({ method: 'GET', originalUrl: '/v1/users' })
            response = responseMock({ statusCode: 123 })
        })

        it('logs to console with level info', () => {
            const handler = accessLogMiddleware({
                thresholdLogError: 500,
                thresholdLogWarn: 250,
                logMessageProvider: () => 'No'
            })
            handler(request, response, () => { })
            response._trigger('finish')

            const infoArgs = console._lastConsoleInfoArgs
            const errorArgs = console._lastConsoleErrorArgs
            const warnArgs = console._lastConsoleWarnArgs
            expect(infoArgs.at(0)).to.contain('No')
            expect(errorArgs).to.be.null
            expect(warnArgs).to.be.null
        })

        it('logs to console with level warn', async () => {
            const handler = accessLogMiddleware({
                thresholdLogError: 500,
                thresholdLogWarn: 250,
                logMessageProvider: () => 'No'
            })
            handler(request, response, () => { })
            await new Promise((resolve) => setTimeout(resolve, 333))
            response._trigger('finish')

            const infoArgs = console._lastConsoleInfoArgs
            const errorArgs = console._lastConsoleErrorArgs
            const warnArgs = console._lastConsoleWarnArgs
            expect(warnArgs.at(0)).to.contain('No')
            expect(errorArgs).to.be.null
            expect(infoArgs).to.be.null
        })

        it('logs to console with level error', async () => {
            const handler = accessLogMiddleware({
                thresholdLogError: 500,
                thresholdLogWarn: 250,
                logMessageProvider: () => 'No'
            })
            handler(request, response, () => { })
            await new Promise((resolve) => setTimeout(resolve, 888))
            response._trigger('finish')

            const infoArgs = console._lastConsoleInfoArgs
            const errorArgs = console._lastConsoleErrorArgs
            const warnArgs = console._lastConsoleWarnArgs
            expect(errorArgs.at(0)).to.contain('No')
            expect(warnArgs).to.be.null
            expect(infoArgs).to.be.null
        })
    })

    describe('with custom logger setting', () => {
        let request = requestMock({ method: 'GET', originalUrl: '/v1/users' })
        let response = responseMock({ statusCode: 123 })

        beforeEach(() => {
            request = requestMock({ method: 'GET', originalUrl: '/v1/users' })
            response = responseMock({ statusCode: 123 })
        })

        it('calls the custom logger function', (done) => {
            const handler = accessLogMiddleware({
                logger: () => done()
            })
            handler(request, response, () => { })
            response._trigger('finish')
        })
    })
})