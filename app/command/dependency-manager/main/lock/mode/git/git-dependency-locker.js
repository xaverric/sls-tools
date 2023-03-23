const {prepareWorkspace} = require("../../../../../../utils/git/git-helper");
const {loadJsonFile} = require("../../../../../../utils/fs-helper");
const path = require("path");
const {groupBy} = require("../../../../../../utils/group-by");
const {scanDependencies, getUniqueDependencyList} = require("../../../helper/dependecy-analyzer-helper");
const {lockDependency} = require("../../helper/lock-helper");
const fs = require("fs");
const {CONSOLE_LOG} = require("../../../../../../logger/logger");

const handleGitLock = async (cmdArgs, configuration) => {
    const uuApps = configuration.uuApp.subAppList.filter(subApp => subApp.gitName);
    for (const uuApp of uuApps) {
        prepareWorkspace(uuApp, configuration);
        await lockDependencies(cmdArgs, configuration, uuApp);
    }
}

const lockDependencies = async (cmdArgs, configuration, uuApp) => {
    for (const projectPath of uuApp.projectPaths) {
        const packageJsonPath = path.resolve(projectPath, "package.json");
        const packageLockJsonPath = path.resolve(projectPath, "package-lock.json");

        let packageJson = loadJsonFile(packageJsonPath);
        let packageLockJson = loadJsonFile(packageLockJsonPath);
        let dependencies = scanDependencies(packageLockJson);
        let uniqueDependencyList = getUniqueDependencyList(dependencies);
        let analysisResult = groupBy(uniqueDependencyList, "name");
        packageJson = lockDependency(packageJson, analysisResult);
        CONSOLE_LOG.info(`Locking dependency in ${packageJsonPath}`);
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf-8");
    }
}

module.exports = {
    handleGitLock
}