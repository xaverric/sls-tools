const login = require("../../client/authorization");

const resolveUuAppAuthorization = async configuration => {
    for(const oidcIdentityName of Object.keys(configuration.uuApp.oidc)) {
        let identity = configuration.uuApp.oidc[oidcIdentityName];
        identity.token = await login(configuration.uuApp.oidcHost, identity.accessCode1, identity.accessCode2);
    }
    return configuration;
}


module.exports = {
    resolveUuAppAuthorization
}