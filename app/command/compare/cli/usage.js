const commandLineUsage = require('command-line-usage');
const { cmdCompareArgumentsDefinition } = require('./arguments.js');
const packageJson = require("./../../../../package.json");

const usageDefinition = [
    {
        header: `compare (sls-tools @${packageJson.version})`,
        content: "Command allowing the user to perform comparison of the exported data."
    },
    {
        header: 'Synopsis',
        content: '$sls-tools compare <command parameters>'
    },
    {
        header: 'Parameters',
        optionList: cmdCompareArgumentsDefinition
    }
];

const compareCommandUsage = commandLineUsage(usageDefinition);

module.exports = {
    compareCommandUsage
};
