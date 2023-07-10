import { expect } from "chai";
import defaultVersionMiddleware from "../../lib/middlewares/default-version.js";
import requestMock from "./request-mock.js";

describe('DefaultVersionMiddleware', () => {

    describe('with default settings', () => {
        it('will remove v1 from incoming path', () => {
            const handler = defaultVersionMiddleware()
            const request = requestMock({ path: '/v1/users', originalUrl: '/v1/users' })
            handler(request, null, () => {
                expect(request.pathname).to.equal('/users')
            })
        })

        it('will remove v1 from incoming originalUrl', () => {
            const handler = defaultVersionMiddleware()
            const request = requestMock({ path: '/v1/users', originalUrl: '/v1/users' })
            handler(request, null, () => {
                expect(request.originalUrl).to.equal('/users')
            })
        })

        it('will remove v1 from incoming url', () => {
            const handler = defaultVersionMiddleware()
            const request = requestMock({ path: '/v1/users', url: '/v1/users' })
            handler(request, null, () => {
                expect(request.url).to.equal('/users')
            })
        })
    })

    describe('with default version setting', () => {
        it('will remove v11 from incoming path', () => {
            const handler = defaultVersionMiddleware(
                { defaultVersion: 'v11' }
            )
            const request = requestMock({ path: '/v11/users', originalUrl: '/v11/users' })
            handler(request, null, () => {
                expect(request.pathname).to.equal('/users')
            })
        })

        it('will remove v11 from incoming originalUrl', () => {
            const handler = defaultVersionMiddleware(
                { defaultVersion: 'v11' }
            )
            const request = requestMock({ path: '/v11/users', originalUrl: '/v11/users' })
            handler(request, null, () => {
                expect(request.originalUrl).to.equal('/users')
            })
        })
    })

    describe('with default regexp setting', () => {
        it('will remove v11 from incoming path', () => {
            const handler = defaultVersionMiddleware(
                { defaultVersionRegExp: new RegExp('^/v11') }
            )
            const request = requestMock({ path: '/v11/users', originalUrl: '/v11/users' })
            handler(request, null, () => {
                expect(request.pathname).to.equal('/users')
            })
        })

        it('will remove v11 from incoming originalUrl', () => {
            const handler = defaultVersionMiddleware(
                { defaultVersionRegExp: new RegExp('^/v11') }
            )
            const request = requestMock({ path: '/v11/users', originalUrl: '/v11/users' })
            handler(request, null, () => {
                expect(request.originalUrl).to.equal('/users')
            })
        })

        it('throws if regexp ends with an asterisk', () => {
            expect(() => {
                defaultVersionMiddleware(
                    { defaultVersionRegExp: new RegExp('^/v11.*') }
                )
            }).to.throw()
        })

        it('throws if regexp ends with a wildcard', () => {
            expect(() => {
                defaultVersionMiddleware(
                    { defaultVersionRegExp: new RegExp('^/v11.+') }
                )
            }).to.throw()
        })

        it('does not throw with trailing wildcard if sanity check was disabled', () => {
            const handler = defaultVersionMiddleware(
                { defaultVersionRegExp: new RegExp('^/v11.*'), disableSanityCheck: true }
            )
            const request = requestMock({ path: '/v11/users', originalUrl: '/v11/users' })
            handler(request, null, () => {
                expect(request.originalUrl).to.equal('')
            })
        })
    })
})