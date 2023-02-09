const {readConfiguration} = require("./configuration/configuration-reader");
const { exportData } = require("./command/export/main/exporter-service");
const {CONSOLE_LOG} = require("./logger/logger");
const {exportCommandUsage} = require("./command/export/cli/usage");
const {checkData} = require("./command/check/main/check-service");
const {processEnvironment} = require("./configuration/helper/environment-processor");

const _handleCmdOperation = async (cmdArgs, fnc) => {
    _isCommandOnly(cmdArgs) && CONSOLE_LOG.info(exportCommandUsage) && process.exit(0);

    let configuration = await readConfiguration(cmdArgs);
    await processEnvironment(configuration, (environment) => fnc(cmdArgs, environment));
}

/**
 * Run export command entry point
 *
 * @param cmdArgs
 * @returns {Promise<void>}
 */
const runExport = async (cmdArgs) => {
    await _handleCmdOperation(cmdArgs, exportData);
}

/**
 * Run check command entry point
 *
 * @param cmdArgs
 * @returns {Promise<void>}
 */
const runCheck = async (cmdArgs) => {
    await _handleCmdOperation(cmdArgs, checkData);
}

const runHelp = (usage) => {
    CONSOLE_LOG.info(usage);
}

const _isCommandOnly = (cmdArgs) => {
    return Object.keys(cmdArgs).length === 1 && cmdArgs.command;
}

module.exports = {
    runExport,
    runCheck,
    runHelp
}