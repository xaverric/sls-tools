const {callCommand: client} = require("../../../../../client/calls");

/**
 * sls-tools Client API to be used in the custom scripts execution
 *
 * @param uuApp - uuApp object name from the configuration, by the uuApp name, the sls-tools automatically resolved the authorization token
 * @param command - command to be called over the uuApp, i.e. user/list
 * @param dtoIn - command dtoIn object
 */
class Client {

    static post = async (uuApp, command, dtoIn) => {
        return await Client._call("POST", uuApp, command, dtoIn);
    }

    static get = async (uuApp, command, dtoIn) => {
        return await Client._call("GET", uuApp, command, dtoIn);
    }

    static _call = async (method, uuApp, command, dtoIn) => {
        return await client(`${uuApp.uri}${command}`, method, dtoIn, uuApp.token);
    }
}

module.exports = Client;