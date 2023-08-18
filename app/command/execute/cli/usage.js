const commandLineUsage = require('command-line-usage');
const { cmdExecuteArgumentsDefinition } = require('./arguments.js');
const packageJson = require("../../../../package.json");

const usageDefinition = [
  {
    header: `execute (sls-tools @${packageJson.version})`,
    content: "Command allowing the user to execute any JS code which is part of the configuration. Can be used for custom script execution via the tool."
  },
  {
    header: 'Synopsis',
    content: '$sls-tools execute <command parameters>'
  },
  {
    header: 'Parameters',
    optionList: cmdExecuteArgumentsDefinition
  }
];

const executeCommandUsage = commandLineUsage(usageDefinition);

module.exports = {
  executeCommandUsage
};
