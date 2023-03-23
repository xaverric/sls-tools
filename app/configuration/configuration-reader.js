const path = require("path");
const os = require("os");
const {resolveUuAppAuthorization, resolveCmdToken, resolveBookkitAuthorization} = require("./helper/authorization-helper");
const {resolveTempDir, resolveTempDirForType} = require("./helper/temp-dir-helper");
const {resolveUuAppBaseUri, resolveCmdCommand} = require("./helper/uri-helper");
const {loadFile} = require("../utils/fs-helper");
const {resolveK8sExportItem} = require("./helper/k8s-export-item-helper");
const {resolveEnvironment} = require("./helper/environment-filter-helper");
const {resolveGitConfiguration} = require("./helper/git-config-helper");
const {CONSOLE_LOG} = require("../logger/logger");

const EMPTY_CONFIG = [{}];

const CONFIG_DEFAULT_PATH = path.join(os.homedir(), '.sls-tools', 'config.js');

const EXPORTS_ITEM_TYPE = "exports";
const CHECKS_ITEM_TYPE = "checks";

const COMMAND_TO_CONFIG_MAPPING = {
    export: {
        configLoad: [
            resolveUuAppAuthorization,
            resolveUuAppBaseUri,
            resolveK8sExportItem,
            (configuration) => resolveTempDirForType(configuration, EXPORTS_ITEM_TYPE),
            (configuration) => resolveCmdCommand(configuration, EXPORTS_ITEM_TYPE),
            (configuration) => resolveCmdToken(configuration, EXPORTS_ITEM_TYPE)
        ]
    },
    check: {
        configLoad: [
            resolveUuAppAuthorization,
            resolveUuAppBaseUri,
            (configuration) => resolveTempDirForType(configuration, CHECKS_ITEM_TYPE),
            (configuration) => resolveCmdCommand(configuration, CHECKS_ITEM_TYPE),
            (configuration) => resolveCmdToken(configuration, CHECKS_ITEM_TYPE)
        ]
    },
    "dependency-manager": {
        configLoad: [
            resolveGitConfiguration
        ]
    }
}

const readConfiguration = async cmdArgs => {
    if (cmdArgs.noconfig) {
        CONSOLE_LOG.info("Execution without config file requested. Proceeding...");
        return EMPTY_CONFIG;
    }

    let configuration;

    if (cmdArgs.config) {
        configuration = await loadFile(path.resolve(cmdArgs.config));
    } else {
        configuration = await loadFile(CONFIG_DEFAULT_PATH);
    }

    configuration = resolveEnvironment(configuration, cmdArgs);
    configuration = await resolveBookkitAuthorization(configuration);
    configuration = await resolveTempDir(configuration);

    for (const configLoadFnc of COMMAND_TO_CONFIG_MAPPING[cmdArgs.command].configLoad) {
        configuration = await configLoadFnc(configuration);
    }

    return configuration;
};

module.exports = {
    readConfiguration
}