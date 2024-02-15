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
        name: 'mode',
        alias: 'm',
        type: String,
        description: 'full|noEnv - define what mode should be used for execute command. In full mode (default), the environment must be specified. With noEnv mode, it is required to provide path to the index.js file of the execution dataset.'
    },
    {
        name: 'path',
        type: String,
        description: 'Path to the index.js file of the execution dataset.'
    },
    {
        name: 'outputDir',
        alias: 'o',
        type: String,
        description: 'Path where to save the output in noEnv mode.'
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
