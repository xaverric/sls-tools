const path = require("path");
const {createDirectoryIfNotExist} = require("../../utils/fs-helper");
const {currentDateWithTime} = require("../../utils/date-utils");

const resolveTempDir = configuration => {
    configuration.tempDir = path.resolve(configuration.tempDir, `${currentDateWithTime()}`);
    createDirectoryIfNotExist(configuration.tempDir);

    configuration.exports.forEach(exportItem => {
        exportItem.tempDir = path.resolve(configuration.tempDir, exportItem.exportType, exportItem.outDirectory ? exportItem.outDirectory : "");
    });

    return configuration;
}

module.exports = {
    resolveTempDir
}