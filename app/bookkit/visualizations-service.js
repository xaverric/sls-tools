const {readJsonFileForVisualization} = require("../bookkit/visualization/helper/file-reader-helper");
const createUu5String = require("../bookkit/visualization/visualization");
const {updateSection} = require("../bookkit/client/bookkit-client");


const processVisualizations = async (cmdArgs, configuration) => {

    for (const exportItem of configuration.exports) {
        if (exportItem.exportType === "cmd" && exportItem.type !== "binary") {
            let data = await readJsonFileForVisualization(exportItem);
            let uu5StringContent =  createUu5String(configuration, data);
            await updateSection(configuration.bookkit.uri, configuration.exports.visualize.page, configuration.exports.visualize.code, uu5StringContent, exportItem.token);
        }
    }
}


module.exports = {
    processVisualizations
}