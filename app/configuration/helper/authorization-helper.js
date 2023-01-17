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

const resolveCmdToken = (configuration, type) => {
    configuration[type]
        .filter(item => item.exportType === "cmd" || type === "checks")
        .forEach(item => {
            const oidcIdentity = _findSubAppConfiguration(configuration, item)?.auth;
            item.token = configuration.uuApp.oidc[oidcIdentity].token;
            return item;
        });
    return configuration;
}

const _findSubAppConfiguration = (configuration, item) => {
    return configuration.uuApp.subAppList.find(subApp => subApp.name === item.uuApp);
}

module.exports = {
    resolveUuAppAuthorization,
    resolveBookkitAuthorization,
    resolveCmdToken
}