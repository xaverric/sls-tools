const { cmdArguments } = require('../cli/arguments');
const { usage } = require('../cli/usage');
const { cmdExportArguments } = require("../../command/export/cli/arguments");
const { runExport, runHelp} = require('../../sls-tools');

const COMMANDS = {
  COMMAND_HELP: 'help',
  COMMAND_EXPORT: 'export'
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
