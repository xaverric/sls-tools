const {loadJsonFile} = require("../../../../../../utils/fs-helper");
const path = require("path");
const {scanDependencies, getUniqueDependencyList} = require("../../../helper/dependecy-analyzer-helper");
const {groupBy} = require("../../../../../../utils/group-by");
const {visualize} = require("../../visualize/analyze-visualization-service");

const handleFileAnalysis = async (cmdArgs) => {
    const packageLockJson = loadJsonFile(path.resolve(cmdArgs.path || cmdArgs.packageLockJsonPath, "package-lock.json"));
    let dependencies = scanDependencies(packageLockJson);
    let uniqueDependencyList = getUniqueDependencyList(dependencies);
    let analysisResult = groupBy(uniqueDependencyList, "name");

    cmdArgs.visualize && await visualize(cmdArgs, analysisResult)
}

module.exports = {
    handleFileAnalysis
}