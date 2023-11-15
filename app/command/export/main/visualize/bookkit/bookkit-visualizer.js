const createTableUu5String = require("./table-visualization-uu5string-builder");
const createObjectUu5String = require("./object-visualization-uu5string-builder");
const {updateSection} = require("../../../../../bookkit/client/bookkit-client");
const {readDataForVisualization} = require("./helper/file-reader-helper");
const {CONSOLE_LOG} = require("../../../../../logger/logger");
const {isVisualizable} = require("../helper/visualization-helper");

const handleBookkitVisualization = async (exportItem, configuration) => {
    if (isVisualizable(exportItem)) {
        try {
            CONSOLE_LOG.info(`Visualizing ${exportItem.name}`)
            let data = await readDataForVisualization(exportItem);
            if (!data) {
                CONSOLE_LOG.warn("Nothing to visualize, empty data gathered.")
                return;
            }
            let uu5StringBuilderFnc = decideUu5StringTemplateBuilder(exportItem.visualize.type);
            let uu5StringContent = uu5StringBuilderFnc(exportItem, data);
            await updateSection(configuration.bookkit.uri, exportItem.visualize.page, exportItem.visualize.code, uu5StringContent, configuration.bookkit.token);
        } catch (e) {
            CONSOLE_LOG.error(`Visualizing of ${exportItem.name} failed. ${e}`);
        }
    }
}

const decideUu5StringTemplateBuilder = (visualizationType) => {
    if (visualizationType === "object") {
        return createObjectUu5String;
    }
    return createTableUu5String;
}

module.exports = {
    handleBookkitVisualization
}