import { expect } from "chai";
import contentTypeMiddleware from "../../lib/middlewares/content-type.js";
import requestMock from "./request-mock.js";
import responseMock from "./response-mock.js";

const HTTP_DELETE_POST_PUT = ['DELETE', 'POST', 'PUT']

describe('ContentTypeMiddleware', () => {

    describe('with default settings', () => {
        const handler = contentTypeMiddleware()

        it('calls next for method GET even without content-type header', (done) => {
            const req = requestMock({ method: 'GET', headers: {} })
            handler(req, null, done)
        })

        HTTP_DELETE_POST_PUT.forEach((method) => {
            it(`calls next for method ${method} if content type is application/json`, (done) => {
                const req = requestMock({ method, headers: { 'content-type': 'application/json' } })
                handler(req, null, done)
            })
        })

        HTTP_DELETE_POST_PUT.forEach((method) => {
            it(`returns status 415 for method ${method} if content type is not set`, (done) => {
                const req = requestMock({ method, headers: {} })
                const res = responseMock({
                    send: (payload) => {
                        const object = JSON.parse(payload)
                        expect(object.status).to.equal(415)
                        expect(object.title).to.equal('Unsupported Media Type')
                        done()
                    }
                })
                handler(req, res, null)
            })
        })

        HTTP_DELETE_POST_PUT.forEach((method) => {
            it(`returns status 415 for method ${method} if content type has other value`, (done) => {
                const req = requestMock({ method, headers: { 'content-type': 'application/xml' } })
                const res = responseMock({
                    send: (payload) => {
                        const object = JSON.parse(payload)
                        expect(object.status).to.equal(415)
                        expect(object.title).to.equal('Unsupported Media Type')
                        done()
                    }
                })
                handler(req, res, null)
            })
        })
    })

    describe('with custom content type setting', () => {
        const contentType = 'application/xml'
        const handler = contentTypeMiddleware({ contentType })

        HTTP_DELETE_POST_PUT.forEach((method) => {
            it(`calls next for method ${method} if content type is application/json`, (done) => {
                const req = requestMock({ method, headers: { 'content-type': contentType } })
                handler(req, null, done)
            })
        })

        HTTP_DELETE_POST_PUT.forEach((method) => {
            it(`returns status 415 for method ${method} if content type is not set`, (done) => {
                const req = requestMock({ method, headers: {} })
                const res = responseMock({
                    send: (payload) => {
                        const object = JSON.parse(payload)
                        expect(object.status).to.equal(415)
                        expect(object.title).to.equal('Unsupported Media Type')
                        done()
                    }
                })
                handler(req, res, null)
            })
        })

        HTTP_DELETE_POST_PUT.forEach((method) => {
            it(`returns status 415 for method ${method} if content type has other value`, (done) => {
                const req = requestMock({ method, headers: { 'content-type': 'application/json' } })
                const res = responseMock({
                    send: (payload) => {
                        const object = JSON.parse(payload)
                        expect(object.status).to.equal(415)
                        expect(object.title).to.equal('Unsupported Media Type')
                        done()
                    }
                })
                handler(req, res, null)
            })
        })
    })

    describe('with custom http method setting', () => {
        const contentType = 'application/json'
        const handler = contentTypeMiddleware({ httpMethods: ['CONNECT'] })

        it(`calls next for method CONNECT if content type is application/json`, (done) => {
            const req = requestMock({ method: 'CONNECT', headers: { 'content-type': contentType } })
            handler(req, null, done)
        })

        HTTP_DELETE_POST_PUT.forEach((method) => {
            it(`calls next for method ${method} if content type is not set`, (done) => {
                const req = requestMock({ method, headers: {} })
                handler(req, null, done)
            })
        })
    })
})