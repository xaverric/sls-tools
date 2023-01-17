const {readConfiguration} = require("./configuration/configuration-reader");
const { exportData } = require("./command/export/main/exporter-service");
const {CONSOLE_LOG} = require("./logger/logger");
const {exportCommandUsage} = require("./command/export/cli/usage");
const {checkCommandUsage} = require("./command/check/cli/usage");
const {checkData} = require("./command/check/main/check-service");

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
}

/**
 * Run check command entry point
 *
 * @param cmdArgs
 * @returns {Promise<void>}
 */
const runCheck = async (cmdArgs) => {
    _isCommandOnly(cmdArgs) && CONSOLE_LOG.info(checkCommandUsage) && process.exit(0);

    let configuration = await readConfiguration(cmdArgs);
    await checkData(cmdArgs, configuration);
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