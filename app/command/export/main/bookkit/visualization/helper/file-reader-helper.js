const path = require("path");
const {loadJsonFile, loadConfigMap} = require("../../../../../../utils/fs-helper");

const DEFAULT_ITEM_LIST_NAME = "itemList";

const readDataForVisualization = async (exportItem) => {
    const filePath = path.join(exportItem.tempDir, exportItem.name);
    const data = exportItem.exportType === "cmd" ? loadJsonFile(filePath) : loadConfigMap(filePath);

    if (exportItem.visualize.type === "object") {
        return data;
    } else {
        const itemListName = exportItem.itemListName ? exportItem.itemListName : DEFAULT_ITEM_LIST_NAME;
        return data[itemListName];
    }
}

module.exports = {
    readDataForVisualization
}