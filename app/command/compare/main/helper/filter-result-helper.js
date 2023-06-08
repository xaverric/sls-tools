const filterResults = (cmdArgs, configuration, resultArray) => {
    resultArray = processDiffOnly(cmdArgs, resultArray);
    resultArray = processIgnoredZipEntries(configuration, resultArray);
    return resultArray;
}

const processDiffOnly = (cmdArgs, resultArray) => {
    if (cmdArgs.diffOnly) {
        return resultArray.filter(item => !!item.diff);
    }
    return resultArray;
}

const processIgnoredZipEntries = (configuration, resultArray) => {
    if (configuration?.compare?.ignoredZipEntries) {
        return resultArray.filter(item => !configuration.compare.ignoredZipEntries.some(ignoredPath => item.name.includes(ignoredPath)));
    }
    return resultArray;
}

module.exports = {
    filterResults
}