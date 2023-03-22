const path = require("path");
const {createDirectoryIfNotExist} = require("../../utils/fs-helper");
const {currentDateWithTime} = require("../../utils/date-utils");
const {processEnvironment} = require("./environment-processor");

const resolveTempDirForType = async (configuration, type) => {
    return await processEnvironment(configuration, (environment) => resolveTempDirForTypeAndEnvironment(environment, type));
}

const resolveTempDirForTypeAndEnvironment = (environment, type) => {
    environment[type]?.forEach(item => {
        item.tempDir = path.resolve(environment.tempDir, item.exportType ? item.exportType : "", item.outDirectory ? item.outDirectory : "");
    });
    return environment;
}

const resolveTempDir = async (configuration) => {
    return await processEnvironment(configuration, resolveTempDirForEnvironment);
}

const resolveTempDirForEnvironment = (environment) => {
    const tempDir = environment.tempDir || "sls-tools-temp";
    environment.tempDir = path.resolve(tempDir, `${currentDateWithTime()}`);
    createDirectoryIfNotExist(environment.tempDir);
    return environment;
}

module.exports = {
    resolveTempDirForType,
    resolveTempDir
}