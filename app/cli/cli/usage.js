const commandLineUsage = require('command-line-usage');
const { cmdArgumentsDefinition } = require('./arguments.js');

const usageDefinition = [
  {
    header: 'sls-tools',
    content: "Your daily helper tool you didn't know you needed"
  },
  {
    header: 'Synopsis',
    content: '$sls-tools <command> <command parameters>'
  },
  {
    header: 'Commands',
    content: [
      { name: 'export', summary: 'Downloads any configuration based on given parameters and configuration.' },
      { name: 'check', summary: 'Downloads any configuration based on given parameters and configuration.' },
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
