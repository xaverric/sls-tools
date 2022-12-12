const {readConfiguration} = require("./configuration/configuration-reader");
const {processVisualizations} = require("./bookkit/visualizations-service");
const { exportData } = require("./exporter/exporter-service");
const {CONSOLE_LOG} = require("./logger/logger");

/**
 * Run export command entry point
 *
 * @param cmdArgs
 * @returns {Promise<void>}
 */
const runExport = async (cmdArgs) => {
    let configuration = await readConfiguration(cmdArgs);
    await exportData(cmdArgs, configuration);
    await processVisualizations(cmdArgs, configuration)
}

const runHelp = (usage) => {
    CONSOLE_LOG.info(usage);
}

module.exports = {
    runExport,
    runHelp
}