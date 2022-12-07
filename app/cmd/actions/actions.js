const { cmdArguments } = require('../cli/arguments');
const { usage } = require('../cli/usage');
const { exportData, help} = require('../../data-exporter');

const COMMANDS = {
  COMMAND_HELP: 'help',
  COMMAND_EXPORT: 'export'
};

const actions = {
  showHelp: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_HELP || cmdArguments.help || Object.keys(cmdArguments).length === 0),
    action: async () => await help(usage)
  },
  downloadConfig: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_EXPORT),
    action: async () => await exportData(cmdArguments)
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
