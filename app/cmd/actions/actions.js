const { cmdArguments } = require('../cli/arguments');
const { usage } = require('../cli/usage');
const { runExport, runHelp} = require('../../data-exporter');

const COMMANDS = {
  COMMAND_HELP: 'help',
  COMMAND_EXPORT: 'export'
};

const actions = {
  runHelp: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_HELP || cmdArguments.help || Object.keys(cmdArguments).length === 0),
    action: async () => await runHelp(usage)
  },
  runExport: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_EXPORT),
    action: async () => await runExport(cmdArguments)
  }
};

const handleCondition = (condition) => {
  if (_isKnownAction()) {
    return condition;
  }
};

const _isKnownAction = () => !cmdArguments._unknown;

module.exports = {
  actions,
  COMMANDS
};
