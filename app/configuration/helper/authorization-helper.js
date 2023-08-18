const login = require("../../client/authorization");
const {processEnvironment} = require("./environment-processor");
const {readSecureStore} = require("../../utils/secure-store-reader/secure-store-reader");
const {CONSOLE_LOG} = require("../../logger/logger");

const resolveUuAppAuthorization = async configuration => {
    return await processEnvironment(configuration, resolveUuAppAuthorizationForEnvironment)
}

const resolveUuAppAuthorizationForEnvironment = async environment => {
    for (const oidcIdentityName of Object.keys(environment.uuApp.oidc)) {
        let identity = environment.uuApp.oidc[oidcIdentityName];
        await _resolveAuthorizationStrategy(identity);
        identity.token = await login(environment.uuApp.oidcHost, identity.accessCode1, identity.accessCode2);
    }
}

const resolveBookkitAuthorization = async configuration => {
    return await processEnvironment(configuration, resolveBookkitAuthorizationForEnvironment)
}

const resolveBookkitAuthorizationForEnvironment = async environment => {
    if (environment.bookkit) {
        await _resolveAuthorizationStrategy(environment.bookkit);
        environment.bookkit.token = await login(environment.bookkit.oidcHost, environment.bookkit.accessCode1, environment.bookkit.accessCode2);
    }
    return environment
}

const resolveCmdToken = async (configuration, type) => {
    return await processEnvironment(configuration, (environment) => resolveCmdTokenForEnvironment(environment, type));
}

const resolveCmdTokenForEnvironment = (environment, type) => {
    environment?.[type]
        ?.filter(item => item.exportType === "cmd" || type === "checks" || type === "credentials-manager" || type === "execute")
        ?.forEach(item => {
            if (item.uuApp) {
                const oidcIdentity = _findSubAppConfiguration(environment, item.uuApp)?.auth;
                item.token = environment.uuApp.oidc[oidcIdentity]?.token;
            } else if (item.uuAppList) {
                item.uuAppList = item.uuAppList
                    .map(uuApp => {
                        const oidcIdentity = _findSubAppConfiguration(environment, uuApp.uuApp)?.auth;
                        return {
                            ...uuApp,
                            token: environment.uuApp.oidc[oidcIdentity]?.token
                        };
                    })
                    .reduce((acc, item) => {
                        acc[item.uuApp] = item
                        return acc;
                    }, {})
            }
            return item;
        });
    return environment;
}

const _findSubAppConfiguration = (configuration, uuApp) => {
    return configuration.uuApp.subAppList.find(subApp => subApp.name === uuApp);
}

const _resolveAuthorizationStrategy = async (identity) => {
    if (identity.strategy === "vault") {
        CONSOLE_LOG.debug(`Authorization of ${identity.uid} using vault strategy`)
        const secureStoreIdentity = await readSecureStore(identity.uid);
        identity.accessCode1 = secureStoreIdentity.ac1;
        identity.accessCode2 = secureStoreIdentity.ac2;
    }
}

module.exports = {
    resolveUuAppAuthorization,
    resolveBookkitAuthorization,
    resolveCmdToken
}