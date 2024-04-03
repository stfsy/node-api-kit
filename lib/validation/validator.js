import { default as Validator } from 'fastest-validator'

const validator = new Validator({
    useNewCustomCheckerFunction: true, // necessary for custom validators
    messages: {
        array: 'Must be an array.',

        email: 'Must be a valid email.',
        emailEmpty: 'Must not be empty.',

        boolean: 'Must be a boolean.',

        number: 'Must be a number.',
        numberPositive: 'Must be a positive number.',
        numberInteger: 'Must be an integer.',
        numberMin: 'Must be greater than min allowed value.',
        numberMax: 'Must be less than max allowed value.',

        required: 'Must not be empty.',
        string: 'Must be a string.',
        stringEmpty: 'Must not be empty.',
        stringMin: 'Length must be greater than or equal to {expected} characters long.',
        stringMax: 'Length must be less than or equal to {expected} characters long.',
        stringLength: 'Length must be {expected} characters long.',
        stringPattern: 'Does not match the required pattern.',
        stringContains: 'Must contain the \'{expected}\'.',
        stringEnum: 'Does not match any of the allowed values.',
        stringNumeric: 'Must be a numeric string.',
        stringAlpha: 'Must be an alphabetic string.',
        stringAlphanum: 'Must be an alphanumeric string.',
        stringAlphadash: 'Must be an alphadash string.',
        stringHex: 'Must be a hex string.',
        stringSingleLine: 'Must be a single line string.',
        stringBase64: 'Must be a base64 string.',

        object: 'Must be an object.',
        objectStrict: 'Must not contain unknown keys.',

        url: 'Must be a valid url.',
        urlLoopback: 'Must not resolve to loopback address.',
        urlProtocol: 'Must use protocol https.',
        urlResolve: 'Must resolve to any ipv4 or ipv6 address.',

        hostname: 'Must be a valid hostname.',
        hostnameOrIp: 'Must be a valid hostname or ip address.',

        uuid: 'Must be a valid resource id.',

        passwordBlacklist: 'Must not be on blocklist.',
        passwordMin: 'Must not be too short.',
        passwordMax: 'Must not be too long.',
        passwordInvalid: 'Must not be invalid',

        fieldNoCreationViaApi: 'Must not be set for resource creation.',
        fieldImmutable: 'Must not be changed after creation.'
    }
})

validator.add('string', () => {
    throw new Error('Do not use built-in string validator, but inline re2StringValidator')
})

/**
 * @module validator
 */
export default validator

/**
 * 
 * @param {string} name name of the message. this is the key you will use to raise the error by calling errors.push(errorName)
 * @param {string} message the message that will be added to the validation error object
 */
export function addMessage(name, message) {
    validator.addMessage(name, message)
}

/**
 * 
 * @param {object} messages an object containing key value pairs
 */
export function addMessages(messages) {
    Object.entries(messages).forEach(([key, value]) => {
        addMessage(key, value)
    })
}