import { createTracer } from '@discue/open-telemetry-tracing';
import { customAlphabet, urlAlphabet } from "nanoid";
import { getPackageName } from './package.js';

const { withActiveSpanSync } = createTracer({
    filepath: import.meta.url,
    spanPrefix: getPackageName()
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