const commandLineArgs = require('command-line-args');
const {cmdArgumentsDefinition} = require("../../../cli/cli/arguments");

const cmdCredentialsManagerArgumentsDefinition = [
    ...cmdArgumentsDefinition,
    {
        name: 'userData',
        type: String,
        description: 'File path to dtoIn file with all needed user information needed for registration'
    }
];

const cmdCredentialsManagerArguments = commandLineArgs(cmdCredentialsManagerArgumentsDefinition, {stopAtFirstUnknown: true});

module.exports = {
    cmdCredentialsManagerArgumentsDefinition,
    cmdCredentialsManagerArguments
};
