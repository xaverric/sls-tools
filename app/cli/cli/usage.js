const commandLineUsage = require('command-line-usage');
const { cmdArgumentsDefinition } = require('./arguments.js');
const packageJson = require("./../../../package.json")

const usageDefinition = [
  {
    header: `sls-tools @${packageJson.version}`,
    content: "Your daily helper tool you didn't know you needed"
  },
  {
    header: 'Synopsis',
    content: '$sls-tools <command> <command parameters>'
  },
  {
    header: 'Commands',
    content: [
      { name: 'export', summary: 'Downloads any configuration and data based on given parameters and configuration.' },
      { name: 'check', summary: 'Checks any configuration based on given parameters and configuration.' },
      { name: 'dependency-manager', summary: 'Allows to analyze and lock project dependencies on other libraries and components.' },
      { name: 'credentials-manager', summary: 'Allows to register user account in the UAF application.' },
      { name: 'compare', summary: 'Allows the user to perform comparison of the exported data.' },
      { name: 'help', summary: 'Checks the URL calls output againts predefined expected output.' }
    ]
  },
  {
    header: 'Parameters',
    optionList: cmdArgumentsDefinition,
  }
];

const usage = commandLineUsage(usageDefinition);

module.exports = {
  usage
};
