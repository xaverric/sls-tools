const PARAM_DELIMITER = "=";

const processParams = async (configuration, cmdArgs) => {
    if (cmdArgs.params) {
        for (const environment of configuration) {
            environment.executeParams = cmdArgs.params.reduce((acc, parameterItem) => {
                const parameter = parameterItem.split(PARAM_DELIMITER);
                acc[parameter[0]] = parameter[1];
                return acc;
            }, {})
        }
    }
    return configuration;
}

module.exports = {
    processParams
}