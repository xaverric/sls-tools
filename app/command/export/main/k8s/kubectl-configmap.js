const {callCliCommand} = require("../../../../cli/cmd-exec-module.js");
const {CONSOLE_LOG} = require("../../../../logger/logger");

const getConfigMap = async exportItem => {
    CONSOLE_LOG.debug(`Searching for ${exportItem.uuApp} configmap in ${exportItem.context}/${exportItem.namespace}`)
    await callCliCommand(`kubectl config use-context ${exportItem.context}`);
    let configMaps = await callCliCommand(`kubectl get configmaps -n ${exportItem.namespace} -o jsonpath='{.items[*]}'`);
    let configMapName = getArrayFromLineContent(configMaps)
        .map(getConfigMapDetail)
        .map(item => item?.metadata?.name)
        .find(name => name.includes(exportItem.uuApp) && name.includes(exportItem.configNamePostfix));

    // export in yaml format
    return await callCliCommand(`kubectl get configmap ${configMapName} -n ${exportItem.namespace} -o yaml`);
};

const getArrayFromLineContent = (lines) => {
    let result = lines.toString().replace(/} {/g, "}||||{");
    if (process.platform === "win32") {
        result = result
            .slice(1)
            .slice(0, -1)
    }
    return result.split("||||");
};

const getConfigMapDetail = line => {
    let result = "";
    try {
        result = JSON.parse(line);
    } catch (e) {
        // ignore error and return empty line for given configMap
    }
    return result;
};

module.exports = {
    getConfigMap
}