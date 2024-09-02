import { expect } from "chai";
import rateLimitMiddleware from "../../lib/middlewares/rate-limit.js";
import requestMock from "./request-mock.js";
import responseMock from "./response-mock.js";

describe('RateLimitMiddleware', () => {
    describe('if no ip was sent', () => {
        const handler = rateLimitMiddleware({
            isIpRateLimitReached: async () => false,
            storeIpAccess: async () => true
        })

        it('returns status 429', (done) => {
            const req = requestMock({
                method: 'GET', headers: {}
            })
            const res = responseMock({
                send: () => {
                    try {
                        expect(res._status()).to.equal(429)
                        done()
                    } catch (e) {
                        done(e)
                    }
                }
            })
            handler(req, res, null)
        })

        it('returns status error object', (done) => {
            const req = requestMock({
                method: 'GET', headers: {}
            })
            const res = responseMock({
                send: (payload) => {
                    try {
                        const object = JSON.parse(payload)
                        expect(object.status).to.equal(429)
                        expect(object.title).to.equal('Too Many Requests')
                        done()
                    } catch (e) {
                        done(e)
                    }
                }
            })
            handler(req, res, null)
        })
    })

    describe('if ip rate limit was not reached', () => {
        const handler = rateLimitMiddleware({
            isIpRateLimitReached: async () => false,
            storeIpAccess: async () => true
        })

        it('calls next', async () => {
            return new Promise((resolve, reject) => {
                const req = requestMock({
                    method: 'GET', headers: {
                        'fastly-client-ip': '1'
                    }
                })
                const res = responseMock({
                    send: reject
                })
                handler(req, res, null).then(resolve, reject)
            })
        })
    })

    describe('allows to configure ip request header', () => {
        const handler = rateLimitMiddleware({
            isIpRateLimitReached: async () => false,
            storeIpAccess: async () => true,
            ipRequestHeaderName: 'my-ip'
        })

        it('calls next', () => {
            return new Promise((resolve, reject) => {
                const req = requestMock({
                    method: 'GET', headers: {
                        'my-ip': '1'
                    }
                })
                const res = responseMock({
                    send: reject
                })
                handler(req, res, null).then(resolve, reject)
            })
        })
    })

    describe('if empty ip header name is allowed', () => {
        const handler = rateLimitMiddleware({
            isIpRateLimitReached: async () => false,
            storeIpAccess: async () => true,
            failIfNoIpPresent: false
        })

        it('calls next', () => {
            return new Promise((resolve, reject) => {
                const req = requestMock({
                    method: 'GET', headers: {}
                })
                const res = responseMock({
                    send: reject
                })
                handler(req, res, null).then(resolve, reject)
            })
        })
    })

    describe('if ip rate limit was reached', () => {
        const handler = rateLimitMiddleware({
            isIpRateLimitReached: async () => true,
            storeIpAccess: async () => true
        })

        it('returns status 429', (done) => {
            const req = requestMock({
                method: 'GET', headers: {
                    'fastly-client-ip': '1'
                }
            })
            const res = responseMock({
                send: () => {
                    try {
                        expect(res._status()).to.equal(429)
                        done()
                    } catch (e) {
                        done(e)
                    }
                }
            })
            handler(req, res, null)
        })

        it('returns status error object', (done) => {
            const req = requestMock({
                method: 'GET', headers: {
                    'fastly-client-ip': '1'
                }
            })
            const res = responseMock({
                send: (payload) => {
                    try {
                        const object = JSON.parse(payload)
                        expect(object.status).to.equal(429)
                        expect(object.title).to.equal('Too Many Requests')
                        done()
                    } catch (e) {
                        done(e)
                    }
                }
            })
            handler(req, res, null)
        })
    })
})