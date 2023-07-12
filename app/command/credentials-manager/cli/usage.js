const commandLineUsage = require('command-line-usage');
const { cmdCredentialsManagerArgumentsDefinition } = require('./arguments.js');
const packageJson = require("./../../../../package.json");

const usageDefinition = [
  {
    header: `credentials-manager (sls-tools @${packageJson.version})`,
    content: "Command allowing the user to register user account in the UAF application."
  },
  {
    header: 'Synopsis',
    content: '$sls-tools credentials-manager <command parameters>'
  },
  {
    header: 'Parameters',
    optionList: cmdCredentialsManagerArgumentsDefinition
  }
];

const credentialsManagerCommandUsage = commandLineUsage(usageDefinition);

module.exports = {
  credentialsManagerCommandUsage
};
