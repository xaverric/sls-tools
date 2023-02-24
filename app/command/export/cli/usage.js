const commandLineUsage = require('command-line-usage');
const { cmdExportArgumentsDefinition } = require('./arguments.js');
const packageJson = require("../../../../package.json");

const usageDefinition = [
  {
    header: `export (sls-tools @${packageJson.version})`,
    content: "Command allowing the user to export predefined set of URLs against the application, store the result into the filesystem and eventually zip all exports into the single zip file and upload it to the bookkit page. Particular REST API call outputs can be also visualized in the bookkit page."
  },
  {
    header: 'Synopsis',
    content: '$sls-tools export <command parameters>'
  },
  {
    header: 'Parameters',
    optionList: cmdExportArgumentsDefinition
  }
];

const exportCommandUsage = commandLineUsage(usageDefinition);

module.exports = {
  exportCommandUsage
};
