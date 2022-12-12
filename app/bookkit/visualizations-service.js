const readAllJsonFilesForVisualization = require("../bookkit/visualization/helper/file-reader-helper");
const createUu5String = require("../bookkit/visualization/visualization");
const updateSection = require("../bookkit/client/bookkit-client");


const processVisualizations = async (configuration, token) => {

    for (const exportItem of configuration.exports) {
        let data = await readAllJsonFilesForVisualization(exportItem);
        let uu5StringContent = createUu5String(configuration, data);
        await updateSection(configuration.bookkit.uri, configuration.exports.visualize.page, configuration.exports.visualize.code, uu5StringContent, token);
    }
}



module.exports = {
    processVisualizations
}