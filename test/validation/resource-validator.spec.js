import { expect } from "chai";
import { addValidationMessage, addValidationMessages } from "../../lib/validation/resource-validator.js";
import validator from "../../lib/validation/validator.js";

describe('ResourceValidator', () => {

    describe('.addValidationMessage', () => {
        it('adds a new errorName and errorMessage', () => {
            addValidationMessage('abc123', '456')
            expect(validator.messages['abc123']).to.equal('456')
        })
    })
    describe('addValidationMessages', () => {
        it('adds all keys and values of an object as error messages', () => {
            addValidationMessages({
                '123': '456',
                'abc': 'def'
            })
            expect(validator.messages['123']).to.equal('456')
            expect(validator.messages['abc']).to.equal('def')
        })
    })
})