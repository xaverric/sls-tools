
const fs = require("fs")

const readAllJsonFilesForVisualization = (exportItem) => {
const path = exportItem.tempDir
    let data = JSON.parse(fs.readFile(path, "utf8"))
    return data
}

module.exports = {
    readAllJsonFilesForVisualization
}