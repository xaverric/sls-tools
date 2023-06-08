const {decideProcessor} = require("./processor/all-processor-service");
const {ZipEntries} = require("./zipentry/ZipEntries");
const {filterResults} = require("./helper/filter-result-helper");
const {decideProducer} = require("./output/output-producer");
const {getZipEntriesFromBookkit} = require("./bookkit/bookkit-zipentries-helper");

const compare = async (cmdArgs, configuration) => {
    const zipPathEntries = await getZipEntries(cmdArgs, configuration);
    const comparisonResult = await getComparisonResult(cmdArgs, configuration, zipPathEntries);

    await decideProducer(cmdArgs.outputType).produce(cmdArgs, configuration, zipPathEntries, comparisonResult)
}

const getZipEntries = async (cmdArgs, configuration) => {
    if (cmdArgs.bookkitCompare) {
       return getZipEntriesFromBookkit(configuration);
    }
    return ZipEntries.initFromArgs(cmdArgs);
}

const getComparisonResult = async (cmdArgs, configuration, zipPathEntries) => {
    const intersectionElements = zipPathEntries.getIntersectionByName();
    const resultArray = intersectionElements.flatMap(zipEntry => decideProcessor(zipEntry).process(zipEntry, zipPathEntries))
    return filterResults(cmdArgs, configuration, resultArray);
}

module.exports = {
    compare
}