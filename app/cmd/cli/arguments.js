const commandLineArgs = require('command-line-args');

const cmdArgumentsDefinition = [
  {
    name: 'command',
    defaultOption: true,
    type: String,
    description: 'download, help commands. All these can be used as default commands without providing --command argument.'
  },
  {
    name: 'config',
    alias: 'c',
    type: String,
    description: 'Configuration file path.'
  },
  {
    name: 'exportType',
    type: String,
    multiple: true,
    description: 'cmd|k8s'
  },
  {
    name: 'fullExport',
    type: Boolean,
    description: 'Flag defining whether all exported files should be published as a single zip file.'
  }
];

const cmdArguments = commandLineArgs(cmdArgumentsDefinition, { stopAtFirstUnknown: true });

module.exports = {
  cmdArgumentsDefinition,
  cmdArguments
};
