const {processEnvironment} = require("./environment-processor");
const {resolve} = require("path");

const resolveGitConfiguration = async (configuration) => {
    return await processEnvironment(configuration, resolveGitConfigurationForEnvironment);
}

const resolveGitConfigurationForEnvironment = (environment) => {
    environment.uuApp.subAppList
        .filter(uuApp => uuApp.gitName)
        .forEach(uuApp => {
            uuApp.gitCheckoutDir = resolve(decideBaseGitDir(environment), uuApp.gitName);
            uuApp.projectPaths = uuApp.projectPaths.map(projectPath => resolve(uuApp.gitCheckoutDir, projectPath));
        });
    return environment;
}

const decideBaseGitDir = (configuration) => {
    return configuration.git.tempDir || configuration.tempDir;
}

module.exports = {
    resolveGitConfiguration
}