const {callCommand} = require("../../../client/calls");
const customFunctionValidate = require("./validator/customFunction-validator");
const deepEqualValidate = require("./validator/deepEqual-validator");
const {CONSOLE_LOG} = require("../../../logger/logger");
const {printConsoleOutput} = require("./console/console-printer-service");
const {processVisualizations} = require("./bookkit/visualizations-service");
const {sendEmailNotification} = require("./email/email-notification-module");

const CHECK_GROUP_ATTR = "checkGroup";

const VALIDATORS = [
    {
        condition: type => type === "function",
        validate: (dtoOut, condition) => customFunctionValidate(dtoOut, condition)
    },
    {
        condition: type => type === "equal",
        validate: (dtoOut, condition) => deepEqualValidate(dtoOut, condition)
    }
]

const _decideValidator = (type) => {
    let validator = VALIDATORS.find(validator => validator.condition(type))
    if (!validator) {
        throw new Error(`No validator found of type ${type}`);
    }
    return validator;
}

const checkData = async (cmdArgs, configuration) => {
    let validationResults = [];
    for (const checkItem of _getFilteredChecks(cmdArgs, configuration)) {
        CONSOLE_LOG.info(`Running check for ${checkItem.uuApp}:${checkItem.command}.`);
        let dtoOut = await callCommand(checkItem.uri, checkItem.method.toUpperCase(), checkItem.dtoIn, checkItem.token);
        let validationResult = await _decideValidator(checkItem.condition.type).validate(dtoOut, checkItem.condition);
        validationResults.push(_getValidationResultWrapper(checkItem, validationResult))
    }

    if (cmdArgs.problemReport) {
        validationResults = validationResults.filter(item => item.validationStatus === "NOK");
    }

    const groupedResults = _groupBy(validationResults, CHECK_GROUP_ATTR);

    cmdArgs.consoleOutput && printConsoleOutput(cmdArgs, groupedResults);
    cmdArgs.visualize && await processVisualizations(cmdArgs, configuration, groupedResults);
    cmdArgs.emailNotification && await sendEmailNotification(cmdArgs, configuration, groupedResults);
}

const _getFilteredChecks = (cmdArgs, configuration) => {
    return cmdArgs.checkGroup ?
        configuration.checks.filter(item => cmdArgs.checkGroup?.includes(item?.checkGroup)) :
        configuration.checks;
}

const _groupBy = (array, key) => {
    return array.reduce((acc, item) => {
        acc[item[key]] = acc[item[key]] || [];
        acc[item[key]].push(item);
        return acc;
    }, {});
}

const _getValidationResultWrapper = (checkItem, validationResult) => {
    return {
        uuApp: checkItem.uuApp,
        command: checkItem.command,
        checkGroup: checkItem.checkGroup,
        validationStatus: validationResult.validationStatus ? "OK" : "NOK",
        errorMessage: validationResult.errorMessage
    }
}

module.exports = {
    checkData
}