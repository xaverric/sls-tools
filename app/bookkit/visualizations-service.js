const createUu5String = require("./visualization/visualization-uu5string-builder");
const {updateSection} = require("../bookkit/client/bookkit-client");
const {readDataForVisualization} = require("./visualization/helper/file-reader-helper");


const processVisualizations = async (configuration) => {
    for (const exportItem of configuration.exports) {
        if (isVisualizable(exportItem)) {
            let data = await readDataForVisualization(exportItem);
            let uu5StringContent = createUu5String(exportItem, data);
            await updateSection(configuration.bookkit.uri, exportItem.visualize.page, exportItem.visualize.code, uu5StringContent, configuration.bookkit.token);
        }
    }
}

const isVisualizable = exportItem => {
    return exportItem.exportType === "cmd" && exportItem.type !== "binary" && exportItem.visualize
}


module.exports = {
    processVisualizations
}