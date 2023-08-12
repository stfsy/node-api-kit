import { expect } from 'chai'
import htmlEncoder from '../../lib/middlewares/html-encoder.js'
import requestMock from "./request-mock.js"
import responseMock from "./response-mock.js"

describe('HtmlEncoder', () => {

    describe('RequestResponseEncoder', () => {
        it('encodes a request body string', (done) => {
            const req = requestMock({ body: '<alert>Hello</alert>' })
            const handler = htmlEncoder()
            handler(req, {}, () => {
                expect(req.body).to.equal('&lt;alert&gt;Hello&lt;/alert&gt;')
                done()
            })
        })

        it('recursively encodes a response body object', (done) => {
            const res = responseMock({
                send: (payload) => {
                    expect(payload.name).to.equal('&lt;alert&gt;Hello&lt;/alert&gt;')
                    expect(payload.pets.at(0).name).to.equal('&lt;link&gt;Pete&lt;/link&gt;')
                    done()
                }
            })
            const handler = htmlEncoder()
            handler({}, res, () => { })
            res.status(200).send({
                name: '<alert>Hello</alert>',
                pets: [{
                    name: '<link>Pete</link>'
                }]
            })
        })
    })

    describe('RequestEncoder', () => {
        it('encodes query parameters', (done) => {
            const req = requestMock({ query: '<alert>Hello</alert>' })
            const handler = htmlEncoder({
                encodeResponsePayload: false
            })
            handler(req, null, () => {
                expect(req.query).to.equal('&lt;alert&gt;Hello&lt;/alert&gt;')
                done()
            })
        })

        it('encodes route params', (done) => {
            const req = requestMock({ params: '<alert>Hello</alert>' })
            const handler = htmlEncoder({
                encodeResponsePayload: false
            })
            handler(req, null, () => {
                expect(req.params).to.equal('&lt;alert&gt;Hello&lt;/alert&gt;')
                done()
            })
        })

        it('encodes headers', (done) => {
            const req = requestMock({ headers: { test: '<alert>Hello</alert>', 'content-type': 'application/json' } })
            const handler = htmlEncoder({
                encodeResponsePayload: false
            })
            handler(req, null, () => {
                expect(req.headers.test).to.equal('&lt;alert&gt;Hello&lt;/alert&gt;')
                expect(req.headers['content-type']).to.equal('application/json')
                done()
            })
        })

        it('encodes a request body string', (done) => {
            const req = requestMock({ body: '<alert>Hello</alert>' })
            const handler = htmlEncoder({
                encodeResponsePayload: false
            })
            handler(req, null, () => {
                expect(req.body).to.equal('&lt;alert&gt;Hello&lt;/alert&gt;')
                done()
            })
        })

        it('recursively encodes a request body object', (done) => {
            const req = requestMock({
                body: {
                    name: '<alert>Hello</alert>',
                    pets: [{
                        name: '<link>Pete</link>'
                    }]
                }
            })
            const handler = htmlEncoder({
                encodeResponsePayload: false
            })
            handler(req, null, () => {
                expect(req.body.name).to.equal('&lt;alert&gt;Hello&lt;/alert&gt;')
                expect(req.body.pets.at(0).name).to.equal('&lt;link&gt;Pete&lt;/link&gt;')
                done()
            })
        })
    })

    describe('ResponseEncoder', () => {
        it('encodes a response body string', (done) => {
            const res = responseMock({
                send: (payload) => {
                    expect(payload).to.equal('&lt;alert&gt;Hello&lt;/alert&gt;')
                    done()
                }
            })
            const handler = htmlEncoder({
                encodeRequestPayload: false
            })
            handler(null, res, () => { })
            res.status(200).send('<alert>Hello</alert>')
        })

        it('recursively encodes a response body object', (done) => {
            const res = responseMock({
                send: (payload) => {
                    expect(payload.name).to.equal('&lt;alert&gt;Hello&lt;/alert&gt;')
                    expect(payload.pets.at(0).name).to.equal('&lt;link&gt;Pete&lt;/link&gt;')
                    done()
                }
            })
            const handler = htmlEncoder({
                encodeRequestPayload: false
            })
            handler(null, res, () => { })
            res.status(200).send({
                name: '<alert>Hello</alert>',
                pets: [{
                    name: '<link>Pete</link>'
                }]
            })
        })
    })
})