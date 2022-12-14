const path = require("path");
const fs = require("fs")
const {error} = require("winston");

const readJsonFileForVisualization = async (exportItem) => {
    const filePath = path.join(exportItem.tempDir, exportItem.name);
    // TODO implement loadJsonFile in fs-helper.js
    // TODO extract list from jsonContent by exportItem.visualization.itemList name and return this list from the function
    let data = null;
    try {
        data = fs.readFileSync(filePath)
        data = JSON.parse(data)
    } catch (e) {
        throw error("Could not load data")
    }

    return data
}

module.exports = {
    readJsonFileForVisualization
}