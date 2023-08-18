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
        ?.filter(item => item.exportType === "cmd" || type === "checks" || type === "credentials-manager" ||type === "execute")
        ?.forEach(item => {
            if (item.uuApp) {
                item.uri = [
                    _findSubAppConfiguration(configuration, item.uuApp)?.baseUri,
                    item.command
                ].join("/");
            } else if (item.uuAppList) {
                item.uuAppList = item.uuAppList.flatMap(uuApp => {
                    return {
                        uuApp: uuApp,
                        uri: [
                            _findSubAppConfiguration(configuration, uuApp)?.baseUri,
                            item.command
                        ].join("/")
                    };
                })
            }
            return item;
        });
    return configuration;
}

const _findSubAppConfiguration = (configuration, uuApp) => {
    return configuration.uuApp.subAppList.find(subApp => subApp.name === uuApp);
}

module.exports = {
    resolveUuAppBaseUri,
    resolveCmdCommand
}