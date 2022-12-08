const path = require("path");
const fs = require("fs")


const createNewDir = async (configuration) => {
    let date = new Date();
    let timestamp = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}`

    let filePath = path.resolve(`${configuration.tempDir}/${timestamp}`);
    try {
       await fs.mkdirSync(filePath, {recursive: true})
        configuration.filePath = filePath;
    } catch (e) {
        console.log(e)
    }

    return configuration;

}
const bindToExportItem = (configuration) => {
    for (const exportItem of configuration.exports) {
        exportItem.saveToPath = configuration.filePath
    }
    return configuration;
}

module.exports = {
    createNewDir,
    bindToExportItem
}