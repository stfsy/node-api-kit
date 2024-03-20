import { expect } from "chai";
import validator from '../../../lib/validation/validator.js';
import { useNotAllowedDuringCreationValidator } from "../../../lib/validation/validators/not-allowed-for-creation-field-validator.js";

describe('ImmutableFieldValidator', () => {

    it('does not require a schema', async () => {
        const schema = useNotAllowedDuringCreationValidator()
        expect(schema.__validator).to.equal('api-kit/NotAllowedForCreationValidator')
    })

    it('sets the private validator name property', async () => {
        const schema = useNotAllowedDuringCreationValidator({})
        expect(schema.__validator).to.equal('api-kit/NotAllowedForCreationValidator')
    })

    it('defines the property as optional', async () => {
        const schema = useNotAllowedDuringCreationValidator({})
        expect(schema.optional).to.be.true
    })

    it('defines the property as immutable', async () => {
        const schema = useNotAllowedDuringCreationValidator({})
        expect(schema.immutable).to.be.true
    })

    it('provides a schema with type custom', () => {
        const schema = useNotAllowedDuringCreationValidator({})
        expect(schema.type).to.equal('custom')
    })

    it('validates if immutable field is not set', async () => {
        const resourceIdValidator = validator.compile({ name: useNotAllowedDuringCreationValidator({ optional: true }) })
        const result = await resourceIdValidator({ first_name: 'test' })
        expect(result).to.be.true
    })

    it('does not validate if immutable field is set', async () => {
        const resourceIdValidator = validator.compile({ name: useNotAllowedDuringCreationValidator({}) })
        const result = await resourceIdValidator({ name: 'test' })
        expect(result.at(0).type).to.equal('fieldNoCreationViaApi')
    })

    it('validates if target value is falsy', async () => {
        const resourceIdValidator = validator.compile({ name: useNotAllowedDuringCreationValidator({}) })
        const result = await resourceIdValidator({})
        expect(result).to.be.true
    })
})