const {promptAccessCodes} = require("../../../utils/prompt/prompt-module");
const {callCommand} = require("../../../client/calls");
const {loadJsonFile} = require("../../../utils/fs-helper");
const {CONSOLE_LOG} = require("../../../logger/logger");
const Console = require("console");

const USER_REGISTRATION_POSITION = 0;
const USER_ACTIVATION_POSITION = 1;

const credentialsManager = async (cmdArgs, configuration) => {
    const registrationCommand = configuration["credentials-manager"][USER_REGISTRATION_POSITION];
    const activationCommand = configuration["credentials-manager"][USER_ACTIVATION_POSITION];

    const userData = cmdArgs.userData ? loadJsonFile(cmdArgs.userData) : _buildUserDataDtoIn(cmdArgs);

    CONSOLE_LOG.info(JSON.stringify(userData, null, 4));

    const oidcData = await _buildOidcDtoIn(activationCommand, userData, cmdArgs);

    CONSOLE_LOG.info(JSON.stringify(oidcData, null, 4));

    cmdArgs.create && await handleCommandCall(callCommand, registrationCommand.uri, registrationCommand.method.toUpperCase(), userData, registrationCommand.token);
    cmdArgs.activate && await handleCommandCall(callCommand, activationCommand.uri, activationCommand.method.toUpperCase(), oidcData, activationCommand.token);
}

const _buildUserDataDtoIn = (cmdArgs) => {
    return {
        uuIdentity: cmdArgs.uuIdentity,
        party: cmdArgs.party,
        firstName: cmdArgs.firstName,
        lastName: cmdArgs.lastName,
        email: cmdArgs.email,
        groups: cmdArgs.groups,
        type: cmdArgs.type
    }
}

const _buildOidcDtoIn = async (activationCommand, userData, cmdArgs) => {
    const accessCodes = cmdArgs.accessCode1 && cmdArgs.accessCode2 ? cmdArgs : await promptAccessCodes();
    return {
        ...activationCommand.dtoIn,
        "identityAccountCode": userData.uuIdentity,
        "newAccessCode1": accessCodes.accessCode1,
        "newAccessCode2": accessCodes.accessCode2
    }
}

const handleCommandCall = async (command, uri, method, data, token) => {
    const result = await command(uri, method, data, token);
    if (!isEmptyUuAppErrorMap(result)) {
        throw new Error("Error during the command call - terminating.");
    } else {
        CONSOLE_LOG.info(`Command performed successfully - ${uri}`);
    }
}

const isEmptyUuAppErrorMap = (dtoOut) => {
    return Object.keys(dtoOut?.uuAppErrorMap).length === 0;
}

module.exports = {
    credentialsManager
}