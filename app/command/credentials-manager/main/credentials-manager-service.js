const {promptAccessCodes} = require("../../../utils/prompt/prompt-module");
const {callCommand} = require("../../../client/calls");
const {loadJsonFile} = require("../../../utils/fs-helper");
const {CONSOLE_LOG} = require("../../../logger/logger");

const USER_REGISTRATION_POSITION = 0;
const USER_ACTIVATION_POSITION = 1;

const credentialsManager = async (cmdArgs, configuration) => {
    const registrationCommand = configuration["credentials-manager"][USER_REGISTRATION_POSITION];
    const activationCommand = configuration["credentials-manager"][USER_ACTIVATION_POSITION];

    const userData = loadJsonFile(cmdArgs.userData);
    const oidcData = await _buildOidcDtoIn(activationCommand, userData);

    CONSOLE_LOG.info(JSON.stringify(oidcData, null, 4));

    await callCommand(registrationCommand.uri, registrationCommand.method.toUpperCase(), userData, registrationCommand.token);
    await callCommand(activationCommand.uri, activationCommand.method.toUpperCase(), oidcData, activationCommand.token);
}

const _buildOidcDtoIn = async (activationCommand, userData) => {
    const accessCodes = await promptAccessCodes();
    return {
        ...activationCommand.dtoIn,
        "identityAccountCode": userData.uuIdentity,
        "newAccessCode1": accessCodes.accessCode1,
        "newAccessCode2": accessCodes.accessCode2
    }
}

module.exports = {
    credentialsManager
}