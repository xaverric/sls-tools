const commandLineArgs = require('command-line-args');

const cmdArgumentsDefinition = [
  {
    name: 'command',
    defaultOption: true,
    type: String,
    description: 'export, help commands. All these can be used as default commands without providing --command argument.'
  },
  {
    name: 'config',
    alias: 'c',
    type: String,
    description: 'Configuration file path.'
  }
];

const cmdArguments = commandLineArgs(cmdArgumentsDefinition, { stopAtFirstUnknown: true });

module.exports = {
  cmdArgumentsDefinition,
  cmdArguments
};
