const commandLineArgs = require('command-line-args');
const {cmdArgumentsDefinition} = require("../../../cli/cli/arguments");

const cmdDependencyManagerArgumentsDefinition = [
    ...cmdArgumentsDefinition,
    {
        name: 'analyze',
        alias: 'a',
        type: Boolean,
        description: 'Perform dependency analysis.'
    },
    {
        name: 'lock',
        alias: 'l',
        type: Boolean,
        description: 'Perform dependency lock.'
    },
    {
        name: 'mode',
        alias: 'm',
        type: String,
        description: 'file|git - define what mode should be used for dependency analysis or dependency lock. With file mode, it is required to provide path to the single package.json and package-lock.json files. With git mode, the tool will checkout the git repository for each uuApp and load the files from there.'
    },
    {
        name: 'path',
        alias: 'p',
        type: String,
        description: 'Path to the directory with package.json and package-lock.json located inside. Applicable for file mode for both analyze and lock attribute.'
    },
    {
        name: 'visualize',
        alias: 'v',
        multiple: true,
        type: String,
        description: 'bookkit|csv - bookkit visualization supported for git mode only, csv is supported for file and git mode. CSVs are stored into the temp directory based on the configuration. Visualization is supported for analyze attribute only.'
    }
];

const cmdDependencyManagerArguments = commandLineArgs(cmdDependencyManagerArgumentsDefinition, {stopAtFirstUnknown: true});

module.exports = {
    cmdDependencyManagerArgumentsDefinition,
    cmdDependencyManagerArguments
};
