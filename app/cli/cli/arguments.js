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
  },
  {
    name: 'environment',
    alias: 'e',
    multiple: true,
    type: String,
    description: 'Specify the environment name for which the action should be performed. If not specified, all available environments are executed.'
  },
  {
    name: 'noprompt',
    type: Boolean,
    description: 'Disable prompt feature.'
  },
  {
    name: 'noconfig',
    type: Boolean,
    description: 'Flag defining whether the config should be loaded. Default value is set to false. This option might get handy when it is required to provide all parameters via CLI only.'
  }
];

const cmdArguments = commandLineArgs(cmdArgumentsDefinition, { stopAtFirstUnknown: true });

module.exports = {
  cmdArgumentsDefinition,
  cmdArguments
};
