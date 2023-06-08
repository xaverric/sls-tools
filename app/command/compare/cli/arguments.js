const commandLineArgs = require('command-line-args');
const {cmdArgumentsDefinition} = require("../../../cli/cli/arguments");

const cmdCompareArgumentsDefinition = [
    ...cmdArgumentsDefinition,
    {
        name: 'left',
        type: String,
        description: 'Path to the zip file containing the export for comparison.'
    },
    {
        name: 'right',
        type: String,
        description: 'Path to the zip file containing the export for comparison.'
    },
    {
        name: 'bookkitCompare',
        type: Boolean,
        description: 'Flag defining whether the tool should download two latest exports from bookkit and use them for comparison. If this option is used, it overrides the --left and --right argument.'
    },
    {
        name: 'diffOnly',
        type: Boolean,
        description: 'Flag defining whether the output should be filtered to contain the differences only.'
    },
    {
        name: 'outputType',
        type: String,
        description: 'HTML - define the comparison output type. HTML is default value.'
    },
    {
        name: 'emailNotification',
        type: Boolean,
        description: 'Flag defining whether the output from comparison should be sent via email.'
    }
];

const cmdCompareArguments = commandLineArgs(cmdCompareArgumentsDefinition, {stopAtFirstUnknown: true});

module.exports = {
    cmdCompareArgumentsDefinition,
    cmdCompareArguments
};
