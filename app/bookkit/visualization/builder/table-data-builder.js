/**
 * Builder function providing the data needed for visualization of table
 *
 * @param data
 * @returns {[{header: *}[], *]}
 */
const build = (data) => {
    return [
        // TODO filter to include only exportItem.visualize.attributes
        guessKeys(data).map(key => {return {header: key}}),
        // TODO filter every data item to include only attributes defined in exportItem.visualize.attributes
        data.map(item => Object.values(item))
    ]
}

const guessKeys = array => {
    return array[0] ? Object.keys(array[0]) : [];
}

module.exports = build