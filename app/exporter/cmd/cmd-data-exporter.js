const {callCommand} = require("../../client/calls");
const {storeFile} = require("../../io/fs-helper");
const {CONSOLE_LOG} = require("../../logger/logger");

const handleCmdExport = async (exportItem) => {
    // TODO call command, handle binary/text type
    CONSOLE_LOG.info(`Calling command for ${JSON.stringify(exportItem)}`);
    // TODO store result to filesystem
}

module.exports = {
    handleCmdExport
}