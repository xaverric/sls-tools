const {CONSOLE_LOG} = require("../../logger/logger");

const processEnvironment = async (configuration, fnc) => {
    for (const environment of configuration) {
        CONSOLE_LOG.info(`Processing environment: ${environment.uuApp.name}`);
        await fnc(environment);
    }
    return configuration;
}

module.exports = {
    processEnvironment
}