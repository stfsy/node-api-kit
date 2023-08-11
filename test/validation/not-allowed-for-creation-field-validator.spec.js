import { expect } from "chai";
import validator from '../../lib/validation/validator.js';
import { useNotAllowedDuringCreationValidator } from "../../lib/validation/validators/not-allowed-for-creation-field-validator.js";

describe('ImmutableFieldValidator', () => {

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
})