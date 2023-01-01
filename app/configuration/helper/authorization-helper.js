const login = require("../../client/authorization");

const resolveUuAppAuthorization = async configuration => {
    for(const oidcIdentityName of Object.keys(configuration.uuApp.oidc)) {
        let identity = configuration.uuApp.oidc[oidcIdentityName];
        identity.token = await login(configuration.uuApp.oidcHost, identity.accessCode1, identity.accessCode2);
    }
    return configuration;
}

const resolveBookkitAuthorization = async configuration => {
    configuration.bookkit.token = await login(configuration.bookkit.oidcHost, configuration.bookkit.accessCode1, configuration.bookkit.accessCode2);
    return configuration
}

const resolveCmdExportItemToken = configuration => {
    configuration.exports
        .filter(exportItem => exportItem.exportType === "cmd")
        .forEach(exportItem => {
            const oidcIdentity = _findSubAppConfiguration(configuration, exportItem)?.auth;
            exportItem.token = configuration.uuApp.oidc[oidcIdentity].token;
            return exportItem;
        });
    return configuration;
}

const _findSubAppConfiguration = (configuration, exportItem) => {
    return configuration.uuApp.subAppList.find(subApp => subApp.name === exportItem.uuApp);
}

module.exports = {
    resolveUuAppAuthorization,
    resolveBookkitAuthorization,
    resolveCmdExportItemToken
}