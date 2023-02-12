const {processEnvironment} = require("./environment-processor");

const resolveUuAppBaseUri = async configuration => {
    return await processEnvironment(configuration, resolveUuAppBaseUriForEnvironment);
}

const resolveUuAppBaseUriForEnvironment = environment => {
    for (const subApp of environment.uuApp.subAppList) {
        subApp.baseUri = `${environment.uuApp.host}/${subApp.context}/${subApp.workspace}`
    }
    return environment;
}

const resolveCmdCommand = async (configuration, type) => {
    return await processEnvironment(configuration, (environment) => resolveCmdCommandForEnvironment(environment, type));
}

const resolveCmdCommandForEnvironment = (configuration, type) => {
    configuration?.[type]
        ?.filter(item => item.exportType === "cmd" || type === "checks")
        ?.forEach(item => {
            item.uri = [
                _findSubAppConfiguration(configuration, item)?.baseUri,
                item.command
            ].join("/");
            return item;
        });
    return configuration;
}

const _findSubAppConfiguration = (configuration, item) => {
    return configuration.uuApp.subAppList.find(subApp => subApp.name === item.uuApp);
}

module.exports = {
    resolveUuAppBaseUri,
    resolveCmdCommand
}