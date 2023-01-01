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
    name: 'exportType',
    type: String,
    multiple: true,
    description: 'cmd|k8s'
  },
  {
    name: 'fullExport',
    type: Boolean,
    description: 'Flag defining whether all exported files should be published as a single zip file.'
  },
  {
    name: 'upload',
    alias: 'u',
    type: Boolean,
    description: 'Upload full export data to predefined bookkit page.'
  },
  {
    name: 'visualize',
    alias: 'v',
    type: Boolean,
    description: 'Flag defining whether all exported files should be visualize in bookkit.'
  }
];

const cmdArguments = commandLineArgs(cmdArgumentsDefinition, { stopAtFirstUnknown: true });

module.exports = {
  cmdArgumentsDefinition,
  cmdArguments
};
