/**
 * Builder function providing the data needed for visualization of table
 *
 * @param data
 * @param exportItem
 * @returns {[{header: *}[], *]}
 */
const build = (data, exportItem) => {
    return [
        getTableColumns(data, exportItem),
        getTableData(data, exportItem)
    ]
}

const getTableColumns = (data, exportItem) => {
    return guessKeys(data)
        .filter(key => exportItem?.visualize?.attributes?.includes(key))
        .map(key => {
            return {header: key}
        });
}

const getTableData = (data, exportItem) => {
    return data
        .map(item => {
            let newItem = {}
            exportItem?.visualize?.attributes?.forEach(attr => {
                newItem[attr] = item[attr]
            })
            return newItem;
        }).map(item => Object.values(item));
}

const guessKeys = array => {
    return array[0] ? Object.keys(array[0]) : [];
}

module.exports = build