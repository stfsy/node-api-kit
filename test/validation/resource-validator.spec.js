import { expect } from "chai";
import { addValidationMessage, addValidationMessages, createValidatorFromSchema } from "../../lib/validation/resource-validator.js";
import validator from "../../lib/validation/validator.js";

describe('ResourceValidator', () => {

    describe('.addValidationMessage', () => {
        it('adds a new errorName and errorMessage', () => {
            addValidationMessage('abc123', '456')
            expect(validator.messages['abc123']).to.equal('456')
        })
    })
    describe('.addValidationMessages', () => {
        it('adds all keys and values of an object as error messages', () => {
            addValidationMessages({
                '123': '456',
                'abc': 'def'
            })
            expect(validator.messages['123']).to.equal('456')
            expect(validator.messages['abc']).to.equal('def')
        })
    })
    describe('.createValidatorFromSchema', () => {
        it('throws if createSchema leaked into updateSchema', () => {
            const schema = {
                $$type: "object",
                address: {
                    $$type: "object",
                    street: {
                        type: "string",
                        empty: false
                    }
                }
            }

            expect(() => {
                const validator = createValidatorFromSchema({
                    createSchemaProvider: () => {
                        return schema
                    }
                })
            }).to.throw(/^Your `createSchema` leaked/)
        })
    })
})