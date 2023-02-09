const login = require("../../client/authorization");
const {processEnvironment} = require("./environment-processor");

const resolveUuAppAuthorization = async configuration => {
    return await processEnvironment(configuration, resolveUuAppAuthorizationForEnvironment)
}

const resolveUuAppAuthorizationForEnvironment = async environment => {
    for (const oidcIdentityName of Object.keys(environment.uuApp.oidc)) {
        let identity = environment.uuApp.oidc[oidcIdentityName];
        identity.token = await login(environment.uuApp.oidcHost, identity.accessCode1, identity.accessCode2);
    }
}

const resolveBookkitAuthorization = async configuration => {
    return await processEnvironment(configuration, resolveBookkitAuthorizationForEnvironment)
}

const resolveBookkitAuthorizationForEnvironment = async environment => {
    environment.bookkit.token = await login(environment.bookkit.oidcHost, environment.bookkit.accessCode1, environment.bookkit.accessCode2);
    return environment
}

const resolveCmdToken = async (configuration, type) => {
    return await processEnvironment(configuration, (environment) => resolveCmdTokenForEnvironment(environment, type));
}

const resolveCmdTokenForEnvironment = (environment, type) => {
    environment[type]
        .filter(item => item.exportType === "cmd" || type === "checks")
        .forEach(item => {
            const oidcIdentity = _findSubAppConfiguration(environment, item)?.auth;
            item.token = environment.uuApp.oidc[oidcIdentity]?.token;
            return item;
        });
    return environment;
}

const _findSubAppConfiguration = (configuration, item) => {
    return configuration.uuApp.subAppList.find(subApp => subApp.name === item.uuApp);
}

module.exports = {
    resolveUuAppAuthorization,
    resolveBookkitAuthorization,
    resolveCmdToken
}