/**
 * Builder function providing the data needed for visualization of csv table
 *
 * @param data
 * @param exportItem
 * @returns {[{header: *}[], *]}
 */
const build = (data, exportItem) => {
    return [
        getTableColumns(data, exportItem),
        getTableData(data, exportItem)
    ].join("\n");
}

const getTableColumns = (data, exportItem) => {
    return guessKeys(data)
        .filter(key => exportItem?.visualize?.attributes?.includes(key))
}

const getTableData = (data, exportItem) => {
    return data
        .map(item => {
            let newItem = {}
            exportItem?.visualize?.attributes?.forEach(attr => {
                newItem[attr] = item[attr]
            })
            return newItem;
        }).map(item => Object.values(item).join(";")).join("\n");
}

const guessKeys = array => {
    return array[0] ? Object.keys(array[0]) : [];
}

module.exports = build