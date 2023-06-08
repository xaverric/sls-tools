const {loadLatestTwoBinariesByName} = require("./bookkit-binary-loader");
const {getBinaryData} = require("../../../../bookkit/client/bookkit-client");
const {storeBinaryFile} = require("../../../../utils/fs-helper");
const {ZipEntries} = require("../zipentry/ZipEntries");
const path = require("path");

const getZipEntriesFromBookkit = async (configuration) => {
    const binaryData = await loadLatestTwoBinariesByName(configuration, configuration.uuApp.name)
    for (const binaryDataItem of binaryData) {
        const data = await getBinaryData(`${configuration.bookkit.uri}`, binaryDataItem.code, configuration.bookkit.token)
        storeBinaryFile(configuration.tempDir, binaryDataItem.filename, data);
    }
    return ZipEntries.initFromArgs({
        left: path.resolve(configuration.tempDir, binaryData[1].filename),
        right: path.resolve(configuration.tempDir, binaryData[0].filename)
    });
}

module.exports = {
    getZipEntriesFromBookkit
}