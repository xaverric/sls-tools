const {readConfiguration} = require("./configuration/configuration-reader");
const {processVisualizations} = require("./bookkit/visualizations-service");
const { exportData } = require("./exporter/exporter-service");
const {CONSOLE_LOG} = require("./logger/logger");
const {processFullExportUpload} = require("./bookkit/full-export-upload-service");

/**
 * Run export command entry point
 *
 * @param cmdArgs
 * @returns {Promise<void>}
 */
const runExport = async (cmdArgs) => {
    let configuration = await readConfiguration(cmdArgs);
    await exportData(cmdArgs, configuration);
    cmdArgs.visualize && await processVisualizations(configuration)
    cmdArgs.fullExport && cmdArgs.upload && await processFullExportUpload(configuration);
}

const runHelp = (usage) => {
    CONSOLE_LOG.info(usage);
}

module.exports = {
    runExport,
    runHelp
}