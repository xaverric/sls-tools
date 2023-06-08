const {CONSOLE_LOG} = require("../../../../../logger/logger");

const processXml = (zipEntry, zipEntries) => {
    CONSOLE_LOG.info("processing xml entry " + zipEntry.entryName);

    return {
        name: zipEntry.entryName,
        diff: ""
    }
}

const canProcess = (zipEntry) => {
    const extension = zipEntry.name.split(".").pop();
    return extension === "xml";
}

module.exports = {
    processXml,
    canProcess
}