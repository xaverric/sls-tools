const {processEnvironment} = require("./environment-processor");

const resolveK8sExportItem = async configuration => {
    return await processEnvironment(configuration, resolveK8sExportItemForEnvironment)
}
const resolveK8sExportItemForEnvironment = async environment => {
    environment.exports = [
        ...environment.exports
            .filter(exportItem => exportItem.exportType === "k8s")
            .map(exportItem => {
                return {
                    ...environment.k8s,
                    ...exportItem
                }
            }),
        ...getRestExportItems(environment)
    ];
    return environment;
}

const getRestExportItems = environment => {
    return environment.exports.filter(exportItem => exportItem.exportType !== "k8s")
}

module.exports = {
    resolveK8sExportItem
}