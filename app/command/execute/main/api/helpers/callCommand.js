const {callCommand} = require("../../../../../client/calls");

/**
 * @deprecated
 *
 * sls-tools callCommand API to be used in the custom scripts execution
 *
 * @param method - http method
 * @param uuApp - uuApp object name from the configuration, by the uuApp name, the sls-tools automatically resolved the authorization token
 * @param command - command to be called over the uuApp, i.e. user/list
 * @param dtoIn - command dtoIn object
 */
const call = async (method, uuApp, command, dtoIn) => {
    const result = await callCommand(`${uuApp.uri}${command}`, method, dtoIn, uuApp.token);
    return result;
}

module.exports = {
    call
}