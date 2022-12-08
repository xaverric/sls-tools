const { callCommand } = require('./calls');

const login = async (oidcHost, accessCode1, accessCode2) => {
    const credentials = {
        accessCode1: accessCode1,
        accessCode2: accessCode2,
        grant_type: 'password',
        scope: 'openid https:// http://localhost'
    };
    const response = await callCommand(oidcHost, "POST", credentials);
    return response.id_token;
};

module.exports = login;
