import { expect } from "chai"
import { sendOk } from "../../lib/http/send-http-ok.js"
import requestMock from "../middlewares/request-mock.js"
import responseMock from "../middlewares/response-mock.js"


describe('SendHttpOk', () => {

    it('sends also empty arrays', () => {
        const req = requestMock({})
        const res = responseMock({
            send: (responseString) => {
                const status = res._status()
                expect(status).to.equal(200)
                const payload = JSON.parse(responseString)
                expect(payload.hello).to.have.length(0)
            }
        })

        sendOk({ req, res, body: { hello: [] } })
    })

    it('sends http 200 without payload', () => {
        const req = requestMock({})
        const res = responseMock({
            send: (responseString) => {
                const status = res._status()
                expect(status).to.equal(200)
                expect(responseString).to.be.empty
            }
        })

        sendOk({ req, res })
    })

    it('sends the payload with status 200', () => {
        const req = requestMock({})
        const res = responseMock({
            send: (responseString) => {
                const status = res._status()
                expect(status).to.equal(200)
                const payload = JSON.parse(responseString)
                expect(payload.hello).to.equal('world')
            }
        })

        sendOk({ req, res, body: { hello: 'world' } })
    })

    it('sends the payload with status 201', () => {
        const req = requestMock({})
        const res = responseMock({
            send: (responseString) => {
                const status = res._status()
                expect(status).to.equal(201)
                const payload = JSON.parse(responseString)
                expect(payload.hello).to.equal('world')
            }
        })

        sendOk({ req, res, status: 201, body: { hello: 'world' } })
    })

    it('does not send a pretty response by default', () => {
        const req = requestMock({})
        const res = responseMock({
            send: (responseString) => {
                const status = res._status()
                expect(status).to.equal(201)
                const payload = JSON.parse(responseString)
                expect(responseString).not.to.include('\n')
                expect(payload.hello).to.equal('world')
            }
        })

        sendOk({ req, res, status: 201, body: { hello: 'world' } })
    })

    it('sends a pretty response', () => {
        const req = requestMock({
            query: {
                pretty: 'true'
            }
        })
        const res = responseMock({
            send: (responseString) => {
                const status = res._status()
                expect(status).to.equal(201)
                const payload = JSON.parse(responseString)
                expect(responseString).to.include('\n')
                expect(payload.hello).to.equal('world')
            }
        })

        sendOk({ req, res, status: 201, body: { hello: 'world' } })
    })

    it('also sends cookies', () => {
        const req = requestMock({
            query: {
                pretty: 'true'
            }
        })
        const res = responseMock({
            send: (responseString) => {
                expect(res._cookies()['dsq-my']).to.equal('cookie')
            }
        })

        sendOk({ req, res, status: 201, body: { hello: 'world' }, cookies: { my: 'cookie' } })
    })

    it('also adds _links to the payload', () => {
        const req = requestMock({
            query: {
                pretty: 'true'
            }
        })
        const res = responseMock({
            send: (responseString) => {
                const status = res._status()
                expect(status).to.equal(201)
                const payload = JSON.parse(responseString)
                expect(responseString).to.include('\n')
                expect(payload.hello).to.equal('world')
                expect(payload._links.self).to.equal('http://127.0.0.1:8080')
            }
        })

        sendOk({ req, res, status: 201, body: { hello: 'world' }, links: { self: 'http://127.0.0.1:8080' } })
    })
})