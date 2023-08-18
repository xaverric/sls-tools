const { cmdArguments } = require('../cli/arguments');
const { usage } = require('../cli/usage');
const { cmdExportArguments } = require("../../command/export/cli/arguments");
const { cmdCheckArguments } = require("../../command/check/cli/arguments");
const { cmdDependencyManagerArguments } = require("../../command/dependency-manager/cli/arguments");
const { cmdCredentialsManagerArguments } = require("../../command/credentials-manager/cli/arguments");
const { cmdCompareArguments } = require("../../command/compare/cli/arguments");
const { cmdExecuteArguments } = require("../../command/execute/cli/arguments");
const { runExport, runHelp, runCheck, runDependencyManager, runCompare, runCredentialsManager, runExecute} = require('../../sls-tools');

const COMMANDS = {
  COMMAND_HELP: 'help',
  COMMAND_EXPORT: 'export',
  COMMAND_CHECK: 'check',
  COMMAND_DEPENDENCY_MANAGER: 'dependency-manager',
  COMMAND_CREDENTIALS_MANAGER: 'credentials-manager',
  COMMAND_COMPARE: 'compare',
  COMMAND_EXECUTE: 'execute'
};

const actions = {
  runHelp: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_HELP || cmdArguments.help || Object.keys(cmdArguments).length === 0),
    actionArguments: () => cmdArguments,
    action: async () => await runHelp(usage)
  },
  runExport: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_EXPORT, cmdExportArguments),
    actionArguments: () => cmdExportArguments,
    action: async () => await runExport({...cmdArguments, ...cmdExportArguments})
  },
  runCheck: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_CHECK, cmdCheckArguments),
    actionArguments: () => cmdCheckArguments,
    action: async () => await runCheck({...cmdArguments, ...cmdCheckArguments})
  },
  runDependencyManager: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_DEPENDENCY_MANAGER, cmdDependencyManagerArguments),
    actionArguments: () => cmdDependencyManagerArguments,
    action: async () => await runDependencyManager({...cmdArguments, ...cmdDependencyManagerArguments})
  },
  runCredentialsManager: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_CREDENTIALS_MANAGER, cmdCredentialsManagerArguments),
    actionArguments: () => cmdCredentialsManagerArguments,
    action: async () => await runCredentialsManager({...cmdArguments, ...cmdCredentialsManagerArguments})
  },
  runCompare: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_COMPARE, cmdCompareArguments),
    actionArguments: () => cmdCompareArguments,
    action: async () => await runCompare({...cmdArguments, ...cmdCompareArguments})
  },
  runExecute: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_EXECUTE, cmdExecuteArguments),
    actionArguments: () => cmdExecuteArguments,
    action: async () => await runExecute({...cmdArguments, ...cmdExecuteArguments})
  }
};

const handleCondition = (condition, args) => {
  if (_isKnownAction(args)) {
    return condition;
  }
};

const _isKnownAction = (args) => !cmdArguments?._unknown || !args?._unknown;

module.exports = {
  actions,
  COMMANDS
};
