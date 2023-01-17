const resolveUuAppBaseUri = configuration => {
    for (const subApp of configuration.uuApp.subAppList) {
        subApp.baseUri = `${configuration.uuApp.host}/${subApp.context}/${subApp.workspace}`
    }
    return configuration;
}

const resolveCmdCommand = (configuration, type) => {
    configuration[type]
        .filter(item => item.exportType === "cmd" || type === "checks")
        .forEach(item => {
            item.uri = [_findSubAppConfiguration(configuration, item)?.baseUri, item.command].join("/");
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