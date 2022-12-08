const {callCommand} = require("../../client/calls");
const {storeFile} = require("../../io/fs-helper");

const handleCmdExport = async (exportItem) => {
    let data = await callCommand(
        exportItem.command,
        exportItem.method.toUpperCase(),
        exportItem.dtoIn,
        exportItem.token,
        {
            binaryContent: exportItem.type
        });
    storeFile(exportItem.tempDir, exportItem.name, _transformContentByExportType(data, exportItem.type));
}

const _transformContentByExportType = (data, type) => {
    return type === "binary" ? data : JSON.stringify(data, null, 4);
}

module.exports = {
    handleCmdExport
}