const {readConfiguration} = require("./configuration/configuration-reader");
const { exportData } = require("./command/export/main/exporter-service");
const {CONSOLE_LOG} = require("./logger/logger");
const {checkData} = require("./command/check/main/check-service");
const {dependencyManager} = require("./command/dependency-manager/main/dependeny-manager-service");
const {processEnvironment} = require("./configuration/helper/environment-processor");
const {promptProceedAction} = require("./utils/prompt/prompt-module");
const {dependencyManagerCommandUsage} = require("./command/dependency-manager/cli/usage");
const {checkCommandUsage} = require("./command/check/cli/usage");
const {exportCommandUsage} = require("./command/export/cli/usage");

const _handleCmdOperation = async (cmdArgs, commandUsage, fnc) => {
    _isCommandOnly(cmdArgs) && CONSOLE_LOG.info(commandUsage) && process.exit(0);

    let configuration = await readConfiguration(cmdArgs);
    let proceed = cmdArgs.noprompt || await promptProceedAction(configuration, cmdArgs);
    proceed && await processEnvironment(configuration, (environment) => fnc(cmdArgs, environment));
}

/**
 * Run export command entry point
 *
 * @param cmdArgs
 * @returns {Promise<void>}
 */
const runExport = async (cmdArgs) => {
    await _handleCmdOperation(cmdArgs, exportCommandUsage, exportData);
}

/**
 * Run check command entry point
 *
 * @param cmdArgs
 * @returns {Promise<void>}
 */
const runCheck = async (cmdArgs) => {
    await _handleCmdOperation(cmdArgs, checkCommandUsage, checkData);
}

/**
 * Run dependency-manager command entry point
 *
 * @param cmdArgs
 * @returns {Promise<void>}
 */
const runDependencyManager = async (cmdArgs) => {
    await _handleCmdOperation(cmdArgs, dependencyManagerCommandUsage, dependencyManager);
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
    runDependencyManager,
    runHelp
}