const path = require("path");
const os = require("os");
const {resolveUuAppAuthorization, resolveCmdExportItemToken, resolveBookkitAuthorization} = require("./helper/authorization-helper");
const {resolveTempDir} = require("./helper/temp-dir-helper");
const {resolveUuAppBaseUri, resolveCmdExportItemCommand} = require("./helper/uri-helper");
const {loadFile} = require("../utils/fs-helper");
const {resolveK8sExportItem} = require("./helper/k8s-export-item-helper");

const CONFIG_DEFAULT_PATH = path.join(os.homedir(), '.sls-tools', 'config.js');

const readConfiguration = async cmdArgs => {
    let configuration;

    if (cmdArgs.config) {
        configuration = await loadFile(path.resolve(cmdArgs.config));
    } else {
        configuration = await loadFile(CONFIG_DEFAULT_PATH);
    }

    configuration = await resolveUuAppAuthorization(configuration);
    configuration = await resolveBookkitAuthorization(configuration);
    configuration = resolveTempDir(configuration);
    configuration = resolveUuAppBaseUri(configuration);
    configuration = resolveCmdExportItemCommand(configuration);
    configuration = resolveCmdExportItemToken(configuration);
    configuration = resolveK8sExportItem(configuration);

    return configuration;
};

module.exports = {
    readConfiguration
}