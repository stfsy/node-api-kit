import { expect } from "chai";
import normalizeRequestMiddleware from "../../lib/middlewares/normalize-request.js";
import requestMock from "./request-mock.js";

describe('NormalizeRequestMiddleware', () => {

    describe('with default settings', () => {
        it('removes query from absolute path', () => {
            const handler = normalizeRequestMiddleware()
            const request = requestMock({ path: '/v1/users?hello=world', originalUrl: '/v1/users?hello=world' })
            handler(request, null, () => {
                expect(request.pathname).to.equal('/v1/users')
            })
        })
        it('removes query from originalUrl', () => {
            const handler = normalizeRequestMiddleware()
            const request = requestMock({ path: '/v1/users?hello=world', originalUrl: '/v1/users?hello=world' })
            handler(request, null, () => {
                expect(request.originalUrl).to.equal('/v1/users')
            })
        })
        it('removes query from absolute url', () => {
            const handler = normalizeRequestMiddleware()
            const request = requestMock({ path: '/v1/users?hello=world', originalUrl: '/v1/users?hello=world' })
            handler(request, null, () => {
                expect(request.url).to.equal('/v1/users')
            })
        })
        it('removes a trailing slash and query param', () => {
            const handler = normalizeRequestMiddleware()
            const request = requestMock({ path: '/v1/users/?hello=world', originalUrl: '/v1/users/?hello=world' })
            handler(request, null, () => {
                expect(request.url).to.equal('/v1/users')
            })
        })
        it('removes a trailing slash', () => {
            const handler = normalizeRequestMiddleware()
            const request = requestMock({ path: '/v1/users/', originalUrl: '/v1/users/' })
            handler(request, null, () => {
                expect(request.url).to.equal('/v1/users')
            })
        })
        it('removes multiple trailing slashes', () => {
            const handler = normalizeRequestMiddleware()
            const request = requestMock({ path: '/v1/users////', originalUrl: '/v1/users////' })
            handler(request, null, () => {
                expect(request.url).to.equal('/v1/users')
            })
        })
    })
})