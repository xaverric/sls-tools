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
    {
        name: 'params',
        alias: 'p',
        type: String,
        multiple: true,
        description: 'Custom dataset parameters provided via CLI. Parameters are provided as a key=value pair in this exact specific format.'
    }
];

const cmdExecuteArguments = commandLineArgs(cmdExecuteArgumentsDefinition, {stopAtFirstUnknown: true});

module.exports = {
    cmdExecuteArgumentsDefinition,
    cmdExecuteArguments
};
