const {storeFile} = require("../../../../utils/fs-helper");
const {getConfigMap} = require("./kubectl-configmap");
const yaml = require("js-yaml");

const handleK8sExport = async (exportItem) => {
    let configMapYaml = await getConfigMap(exportItem);
    let configMapJson = yaml.load(configMapYaml).data.SERVER_CFG;
    storeFile(exportItem.tempDir, exportItem.name, configMapYaml);
    storeFile(exportItem.tempDir, `${exportItem.name}.json`, configMapJson);
}

module.exports = {
    handleK8sExport
}