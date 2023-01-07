const {readConfiguration} = require("./configuration/configuration-reader");
const {processVisualizations} = require("./bookkit/visualizations-service");
const { exportData } = require("./command/export/main/exporter-service");
const {CONSOLE_LOG} = require("./logger/logger");
const {processFullExportUpload} = require("./bookkit/full-export-upload-service");
const {exportCommandUsage} = require("./command/export/cli/usage");

/**
 * Run export command entry point
 *
 * @param cmdArgs
 * @returns {Promise<void>}
 */
const runExport = async (cmdArgs) => {
    _isCommandOnly(cmdArgs) && CONSOLE_LOG.info(exportCommandUsage) && process.exit(0);

    let configuration = await readConfiguration(cmdArgs);
    await exportData(cmdArgs, configuration);
    cmdArgs.visualize && await processVisualizations(configuration)
    cmdArgs.fullExport && cmdArgs.upload && await processFullExportUpload(configuration);
}

const runHelp = (usage) => {
    CONSOLE_LOG.info(usage);
}

const _isCommandOnly = (cmdArgs) => {
    return Object.keys(cmdArgs).length === 1 && cmdArgs.command;
}

module.exports = {
    runExport,
    runHelp
}