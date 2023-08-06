import { customAlphabet, urlAlphabet } from "nanoid";
import { createTracer } from "./tracing.js";

const { withActiveSpanSync } = createTracer('resource-id', {
    filepath: import.meta.url
})

// default value of urlAlphabet is not a valid regular expression
// exposing the alphabet here allows us to reuse it in validators
export const resourceIdAlphabet = urlAlphabet.replace('_', '').replace('-', '') + '-'

const nanoId = customAlphabet(resourceIdAlphabet)

/**
 * Creates a url-safe resource id.
 * 
 * @module newResourceId
 * @returns {String}
 */
export const newResourceId = () => {
    return withActiveSpanSync('create-resource-id', () => {
        return nanoId()
    })
}