const {storeFile} = require("../../../../utils/fs-helper");
const {getConfigMap} = require("./kubectl-configmap");

const handleK8sExport = async (exportItem) => {
    let configMap = await getConfigMap(exportItem);
    storeFile(exportItem.tempDir, exportItem.name, configMap);
}

module.exports = {
    handleK8sExport
}