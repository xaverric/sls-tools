const {storeFile} = require("../../io/fs-helper");
const {getConfigMap} = require("../../k8s/kubectl-configmap");

const handleK8sExport = async (exportItem) => {
    let configMap = await getConfigMap(exportItem);
    storeFile(exportItem.tempDir, exportItem.name, configMap);
}

module.exports = {
    handleK8sExport
}