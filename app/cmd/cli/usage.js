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
      { name: 'help', summary: 'Display this help.' },
      { name: 'export', summary: 'Downloads any configuration based on given parameters and configuration.' }
    ]
  },
  {
    header: 'Parameters',
    optionList: cmdArgumentsDefinition
  }
];

const usage = commandLineUsage(usageDefinition);

module.exports = {
  usage
};
