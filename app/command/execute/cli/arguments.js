const commandLineArgs = require('command-line-args');
const {cmdArgumentsDefinition} = require("../../../cli/cli/arguments");

const cmdExecuteArgumentsDefinition = [
    ...cmdArgumentsDefinition,
    {
        name: 'group',
        type: String,
        multiple: true,
        description: 'Run execute command for selected groups only.'
    },
];

const cmdExecuteArguments = commandLineArgs(cmdExecuteArgumentsDefinition, {stopAtFirstUnknown: true});

module.exports = {
    cmdExecuteArgumentsDefinition,
    cmdExecuteArguments
};
