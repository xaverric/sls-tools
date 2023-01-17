const path = require("path");
const os = require("os");
const {resolveUuAppAuthorization, resolveCmdToken, resolveBookkitAuthorization} = require("./helper/authorization-helper");
const {resolveTempDir, resolveTempDirForType} = require("./helper/temp-dir-helper");
const {resolveUuAppBaseUri, resolveCmdCommand} = require("./helper/uri-helper");
const {loadFile} = require("../utils/fs-helper");
const {resolveK8sExportItem} = require("./helper/k8s-export-item-helper");

const CONFIG_DEFAULT_PATH = path.join(os.homedir(), '.sls-tools', 'config.js');

const ITEM_TYPES = ["exports", "checks"];

const readConfiguration = async cmdArgs => {
    let configuration;

    if (cmdArgs.config) {
        configuration = await loadFile(path.resolve(cmdArgs.config));
    } else {
        configuration = await loadFile(CONFIG_DEFAULT_PATH);
    }

    configuration = await resolveUuAppAuthorization(configuration);
    configuration = await resolveBookkitAuthorization(configuration);
    configuration = resolveUuAppBaseUri(configuration);
    configuration = resolveTempDir(configuration)
    configuration = resolveK8sExportItem(configuration);

    return ITEM_TYPES.reduce((acc, type) => processConfigurationForType(configuration, type, acc), {});
};

const processConfigurationForType = (configuration, type) => {
    configuration = resolveTempDirForType(configuration, type);
    configuration = resolveCmdCommand(configuration, type);
    configuration = resolveCmdToken(configuration, type);
    return configuration;
}

module.exports = {
    readConfiguration
}