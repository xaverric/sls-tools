const AdmZip = require("adm-zip");
const {getFilePath} = require("../../io/fs-helper");
const fs = require("fs");
const {CONSOLE_LOG} = require("../../logger/logger");
const {currentDateWithTime} = require("../../utils/data-utils");

const fullExport = (configuration) => {
    CONSOLE_LOG.info(`Zipping whole content in ${configuration.tempDir} to ${configuration.uuApp.name}_${currentDateWithTime()}_full_export.zip`);
    let zipFilePath = getFilePath(configuration.tempDir, `${configuration.uuApp.name}_${currentDateWithTime()}_full_export.zip`)

    let zipContent = new AdmZip();
    fs.readdirSync(configuration.tempDir).forEach(file => {
        CONSOLE_LOG.info(`Adding ${file} to ${zipFilePath}`);
        zipContent.addLocalFolder(getFilePath(configuration.tempDir, file), file);
    });

    zipContent.writeZip(zipFilePath);
}



module.exports = {
    fullExport
}