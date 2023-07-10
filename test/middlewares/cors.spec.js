import { expect } from 'chai'
import corsMiddleware from '../../lib/middlewares/cors.js'
import requestMock from "./request-mock.js"
import responseMock from "./response-mock.js"

describe('CorsMiddleware', () => {
    let request = requestMock({ method: 'GET', originalUrl: '/v1/users' })
    let response = responseMock({ statusCode: 123 })

    beforeEach(() => {
        request = requestMock({ headers: { origin: 'google.com' }, method: 'GET', originalUrl: '/v1/users' })
        response = responseMock({ statusCode: 123 })
    })

    describe('with missing origin setting', () => {
        it('throws an error', () => {
            expect(() => {
                corsMiddleware()
            }).to.throw()
        })
    })

    describe('with default settings', () => {
        it('applies cors headers', () => {
            const handler = corsMiddleware({
                allowedOrigin: 'localhost'
            })
            handler(request, response, () => { })
            const { _headers: headers } = response
            expect(headers['Access-Control-Allow-Origin']).to.equal('localhost')
            expect(headers['Vary']).to.equal('Origin')
            expect(headers['Access-Control-Allow-Credentials']).to.equal('true')
        })

        it('applies cors headers', () => {
            request = requestMock({ headers: { origin: 'google.com' }, method: 'OPTIONS', originalUrl: '/v1/users' })

            const handler = corsMiddleware({
                allowedOrigin: 'localhost'
            })
            handler(request, response, () => { })
            const { _headers: headers } = response
            expect(headers['Access-Control-Allow-Origin']).to.equal('localhost')
            expect(headers['Access-Control-Allow-Methods']).to.equal('GET,PUT,POST,DELETE')
            expect(headers['Access-Control-Allow-Headers']).to.equal('content-type,authorization')
            expect(headers['Access-Control-Max-Age']).to.equal('1800')
            expect(headers['Vary']).to.equal('Origin')
            expect(headers['Access-Control-Allow-Credentials']).to.equal('true')
        })
    })

    describe('with custom credentials settings', () => {
        it('applies cors headers', () => {
            const handler = corsMiddleware({
                allowedOrigin: 'localhost',
                allowCredentials: false
            })
            handler(request, response, () => { })
            const { _headers: headers } = response
            expect(headers['Access-Control-Allow-Origin']).to.equal('localhost')
            expect(headers['Vary']).to.equal('Origin')
            expect(headers['Access-Control-Allow-Credentials']).to.be.undefined
        })
    })

    describe('with custom methods settings', () => {
        beforeEach(() => {
            request = requestMock({ headers: { origin: 'google.com' }, method: 'OPTIONS', originalUrl: '/v1/users' })
            response = responseMock({ statusCode: 123 })
        })

        it('applies cors headers', () => {
            const handler = corsMiddleware({
                allowedOrigin: 'localhost',
                allowedMethods: 'GET'
            })
            handler(request, response, () => { })
            const { _headers: headers } = response
            expect(headers['Access-Control-Allow-Origin']).to.equal('localhost')
            expect(headers['Access-Control-Allow-Methods']).to.equal('GET')
            expect(headers['Access-Control-Allow-Headers']).to.equal('content-type,authorization')
            expect(headers['Access-Control-Max-Age']).to.equal('1800')
            expect(headers['Vary']).to.equal('Origin')
            expect(headers['Access-Control-Allow-Credentials']).to.equal('true')
        })
    })

    describe('with custom maxAge settings', () => {
        beforeEach(() => {
            request = requestMock({ headers: { origin: 'google.com' }, method: 'OPTIONS', originalUrl: '/v1/users' })
            response = responseMock({ statusCode: 123 })
        })

        it('applies cors headers', () => {
            const handler = corsMiddleware({
                allowedOrigin: 'localhost',
                allowedMaxAge: 1
            })
            handler(request, response, () => { })
            const { _headers: headers } = response
            expect(headers['Access-Control-Allow-Origin']).to.equal('localhost')
            expect(headers['Access-Control-Allow-Methods']).to.equal('GET,PUT,POST,DELETE')
            expect(headers['Access-Control-Allow-Headers']).to.equal('content-type,authorization')
            expect(headers['Access-Control-Max-Age']).to.equal('1')
            expect(headers['Vary']).to.equal('Origin')
            expect(headers['Access-Control-Allow-Credentials']).to.equal('true')
        })
    })

    describe('with custom allowed headers settings', () => {
        beforeEach(() => {
            request = requestMock({ headers: { origin: 'google.com' }, method: 'OPTIONS', originalUrl: '/v1/users' })
            response = responseMock({ statusCode: 123 })
        })

        it('applies cors headers', () => {
            const handler = corsMiddleware({
                allowedOrigin: 'localhost',
                allowedHeaders: ['bla']
            })
            handler(request, response, () => { })
            const { _headers: headers } = response
            expect(headers['Access-Control-Allow-Origin']).to.equal('localhost')
            expect(headers['Access-Control-Allow-Methods']).to.equal('GET,PUT,POST,DELETE')
            expect(headers['Access-Control-Allow-Headers']).to.equal('bla')
            expect(headers['Access-Control-Max-Age']).to.equal('1800')
            expect(headers['Vary']).to.equal('Origin')
            expect(headers['Access-Control-Allow-Credentials']).to.equal('true')
        })
    })

    describe('with custom options success settings', () => {
        beforeEach(() => {
            request = requestMock({ headers: { origin: 'google.com' }, method: 'OPTIONS', originalUrl: '/v1/users' })
            response = responseMock({ statusCode: 123 })
        })

        it('sets custom status code', () => {
            const handler = corsMiddleware({
                allowedOrigin: 'localhost',
                optionsSuccessStatus: 123
            })
            handler(request, response, () => { })
            expect(response.statusCode).to.equal(123)
        })
    })

    describe('with custom preflightContinue settings', () => {
        beforeEach(() => {
            request = requestMock({ headers: { origin: 'google.com' }, method: 'OPTIONS', originalUrl: '/v1/users' })
            response = responseMock({ statusCode: 123 })
        })

        it('calls the next function', (done) => {
            const handler = corsMiddleware({
                allowedOrigin: 'localhost',
                preflightContinue: true
            })
            handler(request, response, done)
        })
    })
})