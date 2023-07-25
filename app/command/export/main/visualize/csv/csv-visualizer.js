const {isVisualizable} = require("../helper/visualization-helper");
const {readDataForVisualization} = require("../bookkit/helper/file-reader-helper");
const {CONSOLE_LOG} = require("../../../../../logger/logger");
const buildTableData = require("./builder/table-data-builder");
const {storeFile} = require("../../../../../utils/fs-helper");

const handleCsvVisualization = async (exportItem, configuration) => {
    if (isVisualizable(exportItem)) {
        CONSOLE_LOG.info(`Visualizing ${exportItem.name}`)
        let data = await readDataForVisualization(exportItem);
        let csvContent = buildTableData(data, exportItem);
        storeFile(configuration.tempDir, `export-visualization_${exportItem.name}_${configuration.uuApp.shortName}.csv`, csvContent);
    }
}

module.exports = {
    handleCsvVisualization
}