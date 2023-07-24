const {uploadFile, createSection} = require("../../../../bookkit/client/bookkit-client");
const createUu5String = require("../visualize/bookkit/full-export-uu5string-builder");
const fs = require("fs");

const processFullExportUpload = async (configuration) => {
    const zipContent = fs.createReadStream(configuration.bookkit.fullExportFilePath);
    const response = await uploadFile(configuration.bookkit.uri, zipContent, configuration.bookkit.token)
    const uu5stringContent = createUu5String(response.code, configuration.uuApp.name);
    await createSection(configuration.bookkit.uri, configuration.bookkit.fullExport, uu5stringContent, configuration.bookkit.token);
}

module.exports = {
    processFullExportUpload
}