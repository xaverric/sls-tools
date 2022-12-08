const resolveUuAppBaseUri = configuration => {
    for (const subApp of configuration.uuApp.subAppList) {
        subApp.baseUri = `${configuration.uuApp.host}/${subApp.context}/${subApp.workspace}`
    }
    return configuration;
}

const resolveCmdExportItemCommand = configuration => {
    configuration.exports
        .filter(exportItem => exportItem.exportType === "cmd")
        .forEach(exportItem => {
            exportItem.command = [_findSubAppConfiguration(configuration, exportItem)?.baseUri, exportItem.command].join("/");
            return exportItem;
        });
    return configuration;
}

const _findSubAppConfiguration = (configuration, exportItem) => {
    return configuration.uuApp.subAppList.find(subApp => subApp.name === exportItem.uuApp);
}

module.exports = {
    resolveUuAppBaseUri,
    resolveCmdExportItemCommand
}