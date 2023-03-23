const {loadJsonFile} = require("../../../../../../utils/fs-helper");
const path = require("path");
const fs = require("fs");
const {scanDependencies, getUniqueDependencyList} = require("../../../helper/dependecy-analyzer-helper");
const {groupBy} = require("../../../../../../utils/group-by");
const {lockDependency} = require("../../helper/lock-helper");
const {CONSOLE_LOG} = require("../../../../../../logger/logger");

const handleFileLock = async (cmdArgs) => {
    const packageJsonPath = path.resolve(cmdArgs.path || cmdArgs.packageJsonPath, "package.json");
    const packageLockJsonPath = path.resolve(cmdArgs.path || cmdArgs.packageLockJsonPath, "package-lock.json");

    let packageJson = loadJsonFile(packageJsonPath);
    let packageLockJson = loadJsonFile(packageLockJsonPath);
    let dependencies = scanDependencies(packageLockJson);
    let uniqueDependencyList = getUniqueDependencyList(dependencies);
    let analysisResult = groupBy(uniqueDependencyList, "name");
    packageJson = lockDependency(packageJson, analysisResult);
    CONSOLE_LOG.info(`Locking dependency in ${packageJsonPath}`);
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf-8");
}



module.exports = {
    handleFileLock
}