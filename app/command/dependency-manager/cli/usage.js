const commandLineUsage = require('command-line-usage');
const { cmdDependencyManagerArgumentsDefinition } = require('./arguments.js');
const packageJson = require("./../../../../package.json");

const usageDefinition = [
  {
    header: `dependency-manager (sls-tools @${packageJson.version})`,
    content: "Allows to analyze amd lock project dependencies on other libraries and components."
  },
  {
    header: 'Synopsis',
    content: '$sls-tools dependency-manager <command parameters>'
  },
  {
    header: 'Parameters',
    optionList: cmdDependencyManagerArgumentsDefinition
  }
];

const dependencyManagerCommandUsage = commandLineUsage(usageDefinition);

module.exports = {
  dependencyManagerCommandUsage
};
