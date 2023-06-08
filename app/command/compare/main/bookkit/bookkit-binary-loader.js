const {listBinaries} = require("../../../../bookkit/client/bookkit-client");

const loadLatestTwoBinariesByName = async (configuration, searchString) => {
    const allBinaries = await _loadAllBinaries(configuration);
    return allBinaries
        .filter(item => item.filename.includes(searchString))
        .sort((a,b) => {
            return new Date(b.sys.cts) - new Date(a.sys.cts);
        })
        .slice(0, 2);
}

const _loadAllBinaries = async (configuration) => {
    let totalSize = 1;
    const allBinaries = [];
    for (let pageIndex = 0; (pageIndex * 1000) < totalSize; pageIndex++) {
        const binaries = await listBinaries(configuration.bookkit.uri, {
            "pageInfo": {
                "pageIndex": pageIndex,
                "pageSize": 1000
            }
        }, configuration.bookkit.token)

        totalSize = binaries.pageInfo.total
        allBinaries.push(...binaries.itemList);
    }
    return allBinaries;
}

module.exports = {
    loadLatestTwoBinariesByName
}