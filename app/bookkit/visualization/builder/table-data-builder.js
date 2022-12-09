/**
 * Builder function providing the data needed for visualization of table
 *
 * @param data
 * @returns {[{header: *}[], *]}
 */
const build = (data) => {
    return [
        guessKeys(data).map(key => {return {header: key}}),
        data.map(item => Object.values(item))
    ]
}

const guessKeys = array => {
    return array[0] ? Object.keys(array[0]) : [];
}

module.exports = build