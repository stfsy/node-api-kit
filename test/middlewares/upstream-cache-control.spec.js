import { expect } from "chai";
import upstreamCacheControl from "../../lib/middlewares/upstream-cache-control.js";
import responseMock from "./response-mock.js";

describe('UpstreamCacheControl', () => {

    describe('with default settings', () => {
        const handler = upstreamCacheControl()

        it(`sets SurrogateControl response headers`, (done) => {
            const res = responseMock()
            handler(null, res, () => {
                expect(res._headers['Surrogate-Control']).to.equal('no-store')
                done()
            })
        })
        it(`sets CacheControl response headers`, (done) => {
            const res = responseMock()
            handler(null, res, () => {
                expect(res._headers['Cache-Control']).to.equal('no-store, no-cache, must-revalidate, proxy-revalidate')
                done()
            })
        })
        it(`sets Expires response headers`, (done) => {
            const res = responseMock()
            handler(null, res, () => {
                expect(res._headers['Expires']).to.equal('0')
                done()
            })
        })
        it(`does not set deprecated Pragma response headers`, (done) => {
            const res = responseMock()
            handler(null, res, () => {
                expect(res._headers['Pragma']).to.be.undefined
                done()
            })
        })
    });

    [
        { key: 'surrogateControl', header: 'Surrogate-Control' },
        { key: 'cacheControl', header: 'Cache-Control' },
        { key: 'expires', header: 'Expires' }
    ].forEach(({ key, header }) => {
        describe(`with custom ${key} setting`, () => {
            it(`sets a custom value`, (done) => {
                const handler = upstreamCacheControl({ [key]: 'hello' })

                const res = responseMock()
                handler(null, res, () => {
                    expect(res._headers[header]).to.equal('hello')
                    done()
                })
            })
            it(`does not set the header at all`, (done) => {
                const handler = upstreamCacheControl({ [key]: null })

                const res = responseMock()
                handler(null, res, () => {
                    expect(res._headers[key]).to.be.undefined
                    done()
                })
            })
        })
    })
})