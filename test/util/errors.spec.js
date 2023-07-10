import { expect } from 'chai'
import { swallow } from '../../lib/util/errors.js'

describe('Errors', () => {

    describe('.swallow', () => {
        it('returns the result of a sync function', async () => {
            const result = await swallow(() => 888, 123)
            expect(result).to.equal(888)
        })

        it('returns the result of an async function', async () => {
            const result = await swallow(() => Promise.resolve(999), 123)
            expect(result).to.equal(999)
        })

        it('catches errors in sync functions and returns default value', async () => {
            const result = await swallow(() => { throw new Error() }, 123)
            expect(result).to.equal(123)
        })

        it('catches errors in async functions and returns default value', async () => {
            const result = await swallow(async () => Promise.reject(1), 456)
            expect(result).to.equal(456)
        })
    })
})