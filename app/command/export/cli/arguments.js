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
        multiple: true,
        type: String,
        description: 'bookkit|csv - Flag defining whether all exported files should be visualize in bookkit or CSV. Bookkit is default if not specified'
    },
    {
        name: 'idFilter',
        multiple: true,
        type: String,
        description: 'Filter for executing only such command with given id. Multiple IDs can be provided.'
    },
];

const cmdExportArguments = commandLineArgs(cmdExportArgumentsDefinition, {stopAtFirstUnknown: true});

module.exports = {
    cmdExportArgumentsDefinition,
    cmdExportArguments
};
