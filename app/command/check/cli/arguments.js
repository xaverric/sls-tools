const commandLineArgs = require('command-line-args');
const {cmdArgumentsDefinition} = require("../../../cli/cli/arguments");

const cmdCheckArgumentsDefinition = [
    ...cmdArgumentsDefinition,
    {
        name: 'consoleOutput',
        type: String,
        description: 'text|table|none - If text value is defined, checks will be logged into the console as a regular text. If table option is used, table form will be used to log into the console. If the attribute is not defined at all, no output will be shown in the console.'
    },
    {
        name: 'checkReportSectionCode',
        type: String,
        description: 'Overrides bookkit section code defined in the configuration.'
    },
    {
        name: 'checkGroup',
        type: String,
        multiple: true,
        description: 'Run checks for selected group names only.'
    },
    {
        name: 'problemReport',
        type: Boolean,
        description: 'Show only checks which did not pass the validation.'
    },
    {
        name: 'visualize',
        alias: 'v',
        type: Boolean,
        description: 'Flag defining whether all checks should be visualized in the predefined bookkit page.'
    },
    {
        name: 'emailNotification',
        type: Boolean,
        description: 'Flag defining whether the output from checks should be sent via email.'
    },
    {
        name: 'recipients',
        type: String,
        multiple: true,
        description: 'Recipient list which overrides the recipient list defined in the configuration.'
    }
];

const cmdCheckArguments = commandLineArgs(cmdCheckArgumentsDefinition, {stopAtFirstUnknown: true});

module.exports = {
    cmdCheckArgumentsDefinition,
    cmdCheckArguments
};
