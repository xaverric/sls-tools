const commandLineUsage = require('command-line-usage');
const { cmdCheckArgumentsDefinition } = require('./arguments.js');

const usageDefinition = [
  {
    header: 'check',
    content: "Command allowing the user to perform checks on predefined set of URLs against the application. Every output from the URL call is validated against expected output and the validation status can be reported directly to the console or bookkit page."
  },
  {
    header: 'Synopsis',
    content: '$sls-tools check <command parameters>'
  },
  {
    header: 'Parameters',
    optionList: cmdCheckArgumentsDefinition
  }
];

const checkCommandUsage = commandLineUsage(usageDefinition);

module.exports = {
  checkCommandUsage
};
