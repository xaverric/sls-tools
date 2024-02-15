const PARAM_DELIMITER = "=";

const processParams = async (configuration, cmdArgs, hasEnv = true) => {
    if (cmdArgs.params) {
        if (hasEnv) {
            for (const environment of configuration) {
                environment.executeParams = reduceParams(cmdArgs);
            }
        } else {
            configuration.executeParams = reduceParams(cmdArgs);
        }
    }
    return configuration;
}

const reduceParams = (cmdArgs) => (
    cmdArgs.params.reduce((acc, parameterItem) => {
        const parameter = parameterItem.split(PARAM_DELIMITER);
        acc[parameter[0]] = parameter[1];
        return acc;
    }, {})
)

module.exports = {
    processParams
}