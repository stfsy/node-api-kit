import { expect } from "chai";
import validator, { addMessage, addMessages } from "../../lib/validation/validator.js";

describe('Validator', () => {

    describe('.addMessage', () => {
        it('adds a new errorName and errorMessage', () => {
            addMessage('abc123', '456')
            expect(validator.messages['abc123']).to.equal('456')
        })
    })
    describe('addMessages', () => {
        it('adds all keys and values of an object as error messages', () => {
            addMessages({
                '123': '456',
                'abc': 'def'
            })
            expect(validator.messages['123']).to.equal('456')
            expect(validator.messages['abc']).to.equal('def')
        })
    })
})