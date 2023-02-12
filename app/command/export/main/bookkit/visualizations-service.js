const createTableUu5String = require("./visualization/table-visualization-uu5string-builder");
const createObjectUu5String = require("./visualization/object-visualization-uu5string-builder");
const {updateSection} = require("../../../../bookkit/client/bookkit-client");
const {readDataForVisualization} = require("./visualization/helper/file-reader-helper");
const {CONSOLE_LOG} = require("../../../../logger/logger");

const processVisualization = async (exportItem, configuration) => {
    if (isVisualizable(exportItem)) {
        CONSOLE_LOG.info(`Visualizing ${exportItem.name}`)
        let data = await readDataForVisualization(exportItem);
        let uu5StringBuilderFnc = decideUu5StringTemplateBuilder(exportItem.visualize.type);
        let uu5StringContent = uu5StringBuilderFnc(exportItem, data);
        await updateSection(configuration.bookkit.uri, exportItem.visualize.page, exportItem.visualize.code, uu5StringContent, configuration.bookkit.token);
    }
}

const decideUu5StringTemplateBuilder = (visualizationType) => {
    if (visualizationType === "object") {
        return createObjectUu5String;
    }
    return createTableUu5String;
}

const isVisualizable = exportItem => {
    return (isNonBinaryCmdExportType(exportItem) || isk8sType(exportItem)) && exportItem.visualize;
}

const isNonBinaryCmdExportType = exportItem => {
    return exportItem.exportType === "cmd" && exportItem.type !== "binary";
}

const isk8sType = exportItem => {
    return exportItem.exportType === "k8s";
}


module.exports = {
    processVisualization
}