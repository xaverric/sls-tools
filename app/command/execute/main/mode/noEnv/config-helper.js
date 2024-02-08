path = require("path");
const {currentDateWithTime} = require("../../../../../utils/date-utils");
const {createDirectoryIfNotExist} = require("../../../../../utils/fs-helper");

const PARAM_DELIMITER = "=";
const TEMP_DIR = "/opt/sls-tools-temp";

const processParamsForNoEnv = (configuration, cmdArgs) => {
    if (cmdArgs.params) {
        configuration.executeParams = cmdArgs.params.reduce((acc, parameterItem) => {
            const parameter = parameterItem.split(PARAM_DELIMITER);
            acc[parameter[0]] = parameter[1];
            return acc;
        }, {})
    }
    return configuration;
}

const resolveTempDirForNoEnv = (configuration) => {
    configuration.tempDir = path.resolve(TEMP_DIR, `${currentDateWithTime()}`);
    createDirectoryIfNotExist(configuration.tempDir);
    return configuration;
}

module.exports = {
    processParamsForNoEnv,
    resolveTempDirForNoEnv
}