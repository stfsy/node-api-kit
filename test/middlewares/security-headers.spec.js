import { expect } from "chai";
import securityHeadersMiddleware from "../../lib/middlewares/security-headers.js";
import requestMock from "./request-mock.js";
import responseMock from "./response-mock.js";

describe('SecurityHeadersMiddleware', () => {
    let request = requestMock({ method: 'GET', originalUrl: '/v1/users' })
    let response = responseMock({ statusCode: 123 })

    beforeEach(() => {
        request = requestMock({ method: 'GET', originalUrl: '/v1/users' })
        response = responseMock({ statusCode: 123 })
    })

    it('sets security headers', (done) => {
        const handler = securityHeadersMiddleware()
        handler(request, response, () => {
            const { _headers: headers } = response
            expect(Object.keys(headers)).to.include('X-XSS-Protection')
            done()
        })
        response._trigger('finish')
    })
})