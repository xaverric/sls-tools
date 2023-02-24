const {prepareWorkspace} = require("../../../../../../utils/git/git-helper");
const {loadJsonFile} = require("../../../../../../utils/fs-helper");
const path = require("path");
const {groupBy} = require("../../../../../../utils/group-by");
const {scanDependencies, getUniqueDependencyList} = require("../../../helper/dependecy-analyzer-helper");
const {visualize} = require("../../visualize/analyze-visualization-service");

const handleGitAnalysis = async (cmdArgs, configuration) => {
    const uuApps = configuration.uuApp.subAppList.filter(subApp => subApp.gitName);
    for (const uuApp of uuApps) {
        prepareWorkspace(uuApp, configuration);
        await analyzeDependencies(cmdArgs, configuration, uuApp);
    }
}

const analyzeDependencies = async (cmdArgs, configuration, uuApp) => {
    for (const projectPath of uuApp.projectPaths) {
        const packageLockJson = loadJsonFile(path.resolve(projectPath, "package-lock.json"));
        let dependencies = scanDependencies(packageLockJson);
        let uniqueDependencyList = getUniqueDependencyList(dependencies);
        let analysisResult = groupBy(uniqueDependencyList, "name");

        cmdArgs.visualize && await visualize(cmdArgs, analysisResult, {uuApp, projectPath, configuration});
    }
}

module.exports = {
    handleGitAnalysis
}