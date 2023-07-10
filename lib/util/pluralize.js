const SPECIAL_CASES = ['s', 'z', 'ch', 'sh', 'x']

/**
 * Pluralizes the given english word. Does the simplest of all jobs by adding `s`, or `es`,
 * depending on the ending of the given word. It does not take special cases like e.g.
 * mouse (singular) and mice (plural) into account. 
 * 
 * @module pluralize
 * @param {String} word
 * @returns {String}
 */
export default (word) => {
    const hasSpecialCase = SPECIAL_CASES.find(special => {
        return word.endsWith(special)
    })

    if (hasSpecialCase) {
        return `${word}es`
    } else {
        return `${word}s`
    }
}