const commandLineArgs = require('command-line-args');
const {cmdArgumentsDefinition} = require("../../../cli/cli/arguments");

const cmdCredentialsManagerArgumentsDefinition = [
    ...cmdArgumentsDefinition,
    {
        name: 'userData',
        type: String,
        description: 'File path to dtoIn file with all needed user information needed for registration'
    },
    {
        name: 'uuIdentity',
        type: String,
        description: 'uuIdentity value'
    },
    {
        name: 'email',
        type: String,
        description: 'email value'
    },
    {
        name: 'firstName',
        type: String,
        description: 'First name value'
    },
    {
        name: 'lastName',
        type: String,
        description: 'Last name value'
    },
    {
        name: 'party',
        type: String,
        description: 'Party value'
    },
    {
        name: 'type',
        type: String,
        description: 'Type value'
    },
    {
        name: 'groups',
        multiple: true,
        type: String,
        description: 'Groups value'
    },
    {
        name: 'accessCode1',
        type: String,
        description: 'Access Code 1 value'
    },
    {
        name: 'accessCode2',
        type: String,
        description: 'Access Code 2 value'
    }
];

const cmdCredentialsManagerArguments = commandLineArgs(cmdCredentialsManagerArgumentsDefinition, {stopAtFirstUnknown: true});

module.exports = {
    cmdCredentialsManagerArgumentsDefinition,
    cmdCredentialsManagerArguments
};
