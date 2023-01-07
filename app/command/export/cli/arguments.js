const commandLineArgs = require('command-line-args');
const {cmdArgumentsDefinition} = require("../../../cli/cli/arguments");

const cmdExportArgumentsDefinition = [
    ...cmdArgumentsDefinition,
    {
        name: 'exportType',
        type: String,
        multiple: true,
        description: 'cmd|k8s'
    },
    {
        name: 'fullExport',
        type: Boolean,
        description: 'Flag defining whether all exported files should be published as a single zip file.'
    },
    {
        name: 'upload',
        alias: 'u',
        type: Boolean,
        description: 'Upload full export data to predefined bookkit page.'
    },
    {
        name: 'visualize',
        alias: 'v',
        type: Boolean,
        description: 'Flag defining whether all exported files should be visualize in bookkit.'
    }
];

const cmdExportArguments = commandLineArgs(cmdExportArgumentsDefinition, {stopAtFirstUnknown: true});

module.exports = {
    cmdExportArgumentsDefinition,
    cmdExportArguments
};
