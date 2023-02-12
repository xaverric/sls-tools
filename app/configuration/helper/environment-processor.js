const processEnvironment = async (configuration, fnc) => {
    for (const environment of configuration) {
        await fnc(environment);
    }
    return configuration;
}

module.exports = {
    processEnvironment
}