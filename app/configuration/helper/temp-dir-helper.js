const path = require("path");
const {createDirectoryIfNotExist} = require("../../io/fs-helper");
const {currentDateWithTime} = require("../../utils/data-utils");

const resolveTempDir = configuration => {
    configuration.tempDir = path.resolve(configuration.tempDir, `${currentDateWithTime()}`);
    createDirectoryIfNotExist(configuration.tempDir);

    configuration.exports.forEach(exportItem => {
        exportItem.tempDir = path.resolve(configuration.tempDir, exportItem.exportType);
    });

    return configuration;
}

module.exports = {
    resolveTempDir
}