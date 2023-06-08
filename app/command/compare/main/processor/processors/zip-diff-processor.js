const {ZipEntries} = require("../../zipentry/ZipEntries");
const {decideFileProcessor} = require("../file-processor-service");
const {CONSOLE_LOG} = require("../../../../../logger/logger");

const processZip = (zipEntry, zipEntries) => {
    CONSOLE_LOG.info("processing zip entry " + zipEntry.entryName);

    const rightZipEntry = zipEntries.right.find(item => item.entryName === zipEntry.entryName);
    const zipMemoryEntries = ZipEntries.initFromData(zipEntry, rightZipEntry);

    const intersectionLeftElements = zipMemoryEntries.getIntersectionByName();

    return intersectionLeftElements.map(zipEntry => decideFileProcessor(zipEntry).process(zipEntry, zipMemoryEntries))
}

const canProcess = (zipEntry) => {
    const extension = zipEntry.name.split(".").pop();
    return extension === "zip";
}

module.exports = {
    processZip,
    canProcess
}