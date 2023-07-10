const SPECIAL_CASES = ['s', 'z', 'ch', 'sh', 'x']

/**
 * Singularizes the given english word. Does the simplest of all jobs by removing `s`, or `es`,
 * depending on the ending of the given word. It does not take special cases like e.g.
 * mice (plural) and mouse (singular) into account. 
 * 
 * @module singularize
 * @param {String} word
 * @returns 
 */
export default (word) => {
    if (word.endsWith('es')) {
        const substring = word.substring(0, word.length - 2)

        const hasSpecialCase = SPECIAL_CASES.find(special => {
            return substring.endsWith(special)
        })

        if (substring.endsWith('ss')) {
            return substring.substring(0, substring.length - 1)
        } else if (hasSpecialCase) {
            return substring
        } else {
            return word.substring(0, word.length - 1)
        }
    } else if (word.endsWith('s')) {
        return word.substring(0, word.length - 1)
    } else {
        throw new Error(`Is ${word} really plural? Then we need to fix this asap..`)
    }
}