const { callCommand } = require('./calls');
const {CONSOLE_LOG} = require("../logger/logger");

const login = async (oidcHost, accessCode1, accessCode2) => {
    const credentials = {
        accessCode1: accessCode1,
        accessCode2: accessCode2,
        grant_type: 'password',
        scope: 'openid https:// http://localhost'
    };
    const response = await callCommand(oidcHost, "POST", credentials);
    if (!response.id_token) {
        CONSOLE_LOG.error(JSON.stringify(response, null, 4));
    }
    return response.id_token;
};

module.exports = login;
