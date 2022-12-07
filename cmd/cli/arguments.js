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
    description: 'Base configuration folder path containing [env].json files with contexts.json for each environment.'
  },
  {
    name: 'environment',
    alias: 'e',
    type: String,
    description: 'Environment name defined in the base configuration folder unde the filename [env].json.'
  },
  {
    name: 'select',
    alias: 's',
    type: String,
    description: 'String of wanted CMD to be run separeted by ","'
  },
  {
    name: 'k8s',
    alias: 'k',
    type: String,
    description: 'Downloads all k8s files defined in config (based on exportType)'
  },
  {
    name: 'cmd',
    alias: '',
    type: String,
    description: 'Downloads all CMD files defined in config (based on exportType)'
  },
  {
    name: 'table',
    alias: 't',
    type: Boolean,
    description: 'Diplay the ouput in the table form.'
  }
];

const cmdArguments = commandLineArgs(cmdArgumentsDefinition, { stopAtFirstUnknown: true });

module.exports = {
  cmdArgumentsDefinition,
  cmdArguments
};
