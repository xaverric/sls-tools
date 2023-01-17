const {callCommand} = require("../../../../client/calls");
const {storeFile} = require("../../../../utils/fs-helper");

const handleCmdExport = async (exportItem) => {
    let data = await callCommand(
        exportItem.uri,
        exportItem.method.toUpperCase(),
        exportItem.dtoIn,
        exportItem.token,
        {
            binaryContent: exportItem.type
        });
    storeFile(exportItem.tempDir, exportItem.name || `${exportItem.uuApp}.json`, _transformContentByExportType(data, exportItem.type));
}

const _transformContentByExportType = (data, type) => {
    return type === "binary" ? data : JSON.stringify(data, null, 4);
}

module.exports = {
    handleCmdExport
}