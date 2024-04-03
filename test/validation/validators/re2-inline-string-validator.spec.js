import { expect } from "chai";
import { useRe2StringValidator } from "../../../lib/validation/validators/re2-inline-string-validator.js";

describe('Re2InlineStringValidator', () => {

    it('overrides type string validator', () => {
        const validator = useRe2StringValidator({type: 'string'})
        expect(validator.type).to.equal('custom')
    })
})