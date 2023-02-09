const path = require("path");
const os = require("os");
const {resolveUuAppAuthorization, resolveCmdToken, resolveBookkitAuthorization} = require("./helper/authorization-helper");
const {resolveTempDir, resolveTempDirForType} = require("./helper/temp-dir-helper");
const {resolveUuAppBaseUri, resolveCmdCommand} = require("./helper/uri-helper");
const {loadFile} = require("../utils/fs-helper");
const {resolveK8sExportItem} = require("./helper/k8s-export-item-helper");
const {resolveEnvironment} = require("./helper/environment-filter-helper");

const CONFIG_DEFAULT_PATH = path.join(os.homedir(), '.sls-tools', 'config.js');

const ITEM_TYPES = ["exports", "checks"];

const readConfiguration = async cmdArgs => {
    let configuration;

    if (cmdArgs.config) {
        configuration = await loadFile(path.resolve(cmdArgs.config));
    } else {
        configuration = await loadFile(CONFIG_DEFAULT_PATH);
    }

    configuration = resolveEnvironment(configuration, cmdArgs);
    configuration = await resolveUuAppAuthorization(configuration);
    configuration = await resolveBookkitAuthorization(configuration);
    configuration = await resolveUuAppBaseUri(configuration);
    configuration = await resolveTempDir(configuration)
    configuration = await resolveK8sExportItem(configuration);

    for (const type of ITEM_TYPES) {
        configuration = await resolveTempDirForType(configuration, type);
        configuration = await resolveCmdCommand(configuration, type);
        configuration = await resolveCmdToken(configuration, type);
    }
    return configuration;
};

module.exports = {
    readConfiguration
}