import { expect } from "chai";
import httpAwareErrorHandler from "../../lib/util/http-aware-error-handler.js";
import responseMock from "../middlewares/response-mock.js";

describe('HttpAwareErrorHandler', () => {
    let response

    beforeEach(() => {
        response = responseMock({ send: () => { } })
    })

    it('returns successful callback result', async () => {
        const result = await httpAwareErrorHandler(null, () => Promise.resolve(1))
        expect(result).to.equal(1)
    })

    it('sets status 404 if "Not Found" was thrown', async () => {
        await httpAwareErrorHandler(response, () => { throw new Error('Not Found') })
        expect(response._status()).to.equal(404)
    })

    it('sets status 422 if "Exists" was thrown', async () => {
        await httpAwareErrorHandler(response, () => { throw new Error('Exists') })
        expect(response._status()).to.equal(422)
    })

    it('sets status 500 if an unknown error was thrown', async () => {
        await httpAwareErrorHandler(response, () => { throw new Error('unknown') })
        expect(response._status()).to.equal(500)
    })

    it('sets status 501 if "Not Implemented" was thrown', async () => {
        await httpAwareErrorHandler(response, () => { throw new Error('Not Implemented') })
        expect(response._status()).to.equal(501)
    })
})