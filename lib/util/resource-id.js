import { customAlphabet, urlAlphabet } from "nanoid";

// default value of urlAlphabet is not a valid regular expression
// exposing the alphabet here allows us to reuse it in validators
export const alphabet = urlAlphabet.replace('_', '').replace('-', '') + '-'

const nanoId = customAlphabet(alphabet)

/**
 * Creates a url-safe resource id.
 * 
 * @module newResourceId
 * @returns {String}
 */
export const newResourceId = () => {
    return nanoId()
}