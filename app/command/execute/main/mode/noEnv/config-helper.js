path = require("path");
const {currentDateWithTime} = require("../../../../../utils/date-utils");
const {createDirectoryIfNotExist} = require("../../../../../utils/fs-helper");

const HOME_DIR = require('os').homedir();
const DEFAULT_DIR = `${HOME_DIR}/sls-tools-temp`;

const resolveTempDirForNoEnv = (configuration, cmdArgs) => {
    const outDir = cmdArgs.outputDir? cmdArgs.outputDir : DEFAULT_DIR;
    configuration.tempDir = path.resolve(outDir, `${currentDateWithTime()}`);
    createDirectoryIfNotExist(configuration.tempDir);
    return configuration;
}

module.exports = {
    resolveTempDirForNoEnv
}