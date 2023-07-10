import { expect } from "chai"
import traceContextMiddleware from "../../lib/middlewares/trace-context.js"
import { getFromLocalStorage, getRequestFromLocalStorage, getResponseFromLocalStorage, getTraceIdFromLocalStorage } from "../../lib/util/trace-context.js"
import requestMock from "./request-mock.js"
import responseMock from "./response-mock.js"

describe('TraceContextMiddleware', () => {
    let request = requestMock({ method: 'GET', originalUrl: '/v1/users' })
    let response = responseMock({ statusCode: 123 })

    beforeEach(() => {
        request = requestMock({ method: 'GET', originalUrl: '/v1/users' })
        response = responseMock({ statusCode: 123 })
    })

    describe('with default settings', () => {

        it('adds a random trace id to the context', (done) => {
            const handler = traceContextMiddleware()
            handler(request, response, () => {
                const traceId = getTraceIdFromLocalStorage()
                expect(traceId).to.be.a('string')
                done()
            })
            response._trigger('finish')
        })

        it('adds the request to the context', (done) => {
            const handler = traceContextMiddleware()
            handler(request, response, () => {
                const req = getRequestFromLocalStorage()
                expect(req).to.not.be.undefined
                expect(req).to.not.be.null
                done()
            })
            response._trigger('finish')
        })

        it('adds the response to the context', (done) => {
            const handler = traceContextMiddleware()
            handler(request, response, () => {
                const req = getResponseFromLocalStorage()
                expect(req).to.not.be.undefined
                expect(req).to.not.be.null
                done()
            })
            response._trigger('finish')
        })
    })

    describe('with custom traceContextProvider settings', () => {

        it('adds a contextId to the context', (done) => {
            const handler = traceContextMiddleware({
                traceContextProvider: () => {
                    return {
                        contextId: '4815162342'
                    }
                }
            })
            handler(request, response, () => {
                const contextId = getFromLocalStorage('contextId')
                expect(contextId).to.equal('4815162342')
                done()
            })
            response._trigger('finish')
        })
        it('still adds the default traceId', (done) => {
            const handler = traceContextMiddleware({
                traceContextProvider: () => {
                    return {
                        contextId: '4815162342'
                    }
                }
            })
            handler(request, response, () => {
                const traceId = getTraceIdFromLocalStorage()
                expect(traceId).to.be.a('string')
                done()
            })
            response._trigger('finish')
        })
    })
})