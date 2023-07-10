import { expect } from "chai";
import asyncCacheable, { async, sync } from "../../lib/util/cacheable.js";

describe('Cacheable', () => {

    describe('.default', () => {

        it('calls the provider only once', async () => {
            let calls = 0
            const cache = asyncCacheable(async () => {
                calls++
                return calls
            })
            await cache()
            await cache()
            expect(calls).to.equal(1)
        })
    })

    describe('.async', () => {

        it('calls the provider only once', async () => {
            let calls = 0
            const cache = async(async () => {
                calls++
                return calls
            })
            await cache()
            await cache()
            expect(calls).to.equal(1)
        })
    })

    describe('.async', () => {

        it('calls the provider only once', () => {
            let calls = 0
            const cache = sync(() => {
                calls++
                return calls
            })
            cache()
            cache()
            expect(calls).to.equal(1)
        })
    })
})