import accessLogMiddleware from '../../lib/middlewares/access-log.js'
import requestMock from "./request-mock.js"
import responseMock from "./response-mock.js"

describe('AccessLogMiddleware', () => {




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