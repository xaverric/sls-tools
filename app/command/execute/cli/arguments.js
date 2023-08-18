const commandLineArgs = require('command-line-args');
const {cmdArgumentsDefinition} = require("../../../cli/cli/arguments");

const cmdExecuteArgumentsDefinition = [
    ...cmdArgumentsDefinition
];

const cmdExecuteArguments = commandLineArgs(cmdExecuteArgumentsDefinition, {stopAtFirstUnknown: true});

module.exports = {
    cmdExecuteArgumentsDefinition,
    cmdExecuteArguments
};
