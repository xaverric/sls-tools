const {CONSOLE_LOG} = require("../../../../../logger/logger");

const processYaml = (zipEntry, zipEntries) => {
    CONSOLE_LOG.info("processing yaml entry " + zipEntry.entryName);

    return {
        name: zipEntry.entryName,
        diff: ""
    }
}

const canProcess = (zipEntry) => {
    const extension = zipEntry.name.split(".").pop();
    return extension === "yaml";
}

module.exports = {
    processYaml,
    canProcess
}