const path = require("path");
const {createDirectoryIfNotExist} = require("../../utils/fs-helper");
const {currentDateWithTime} = require("../../utils/date-utils");

const resolveTempDirForType = (configuration, type) => {
    configuration[type].forEach(item => {
        item.tempDir = path.resolve(configuration.tempDir, item.exportType ? item.exportType : "", item.outDirectory ? item.outDirectory : "");
    });

    return configuration;
}

const resolveTempDir = (configuration) => {
    configuration.tempDir = path.resolve(configuration.tempDir, `${currentDateWithTime()}`);
    createDirectoryIfNotExist(configuration.tempDir);

    return configuration;
}

module.exports = {
    resolveTempDirForType,
    resolveTempDir
}