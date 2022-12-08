const resolveK8sExportItem = configuration => {
    configuration.exports = [
        ...configuration.exports
            .filter(exportItem => exportItem.exportType === "k8s")
            .map(exportItem => {
                return {
                    ...configuration.k8s,
                    ...exportItem
                }
            }),
        ...getRestExportItems(configuration)
    ];
    return configuration;
}

const getRestExportItems = configuration => {
    return configuration.exports.filter(exportItem => exportItem.exportType !== "k8s")
}

module.exports = {
    resolveK8sExportItem
}