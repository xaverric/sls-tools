const resolveEnvironment = (configuration, cmdArgs) => {
    configuration = convertFromObjectConfig(configuration);
    if (cmdArgs.environment) {
        configuration = configuration.filter(environment => cmdArgs.environment.includes(environment.uuApp.shortName))
    }
    return configuration;
}

const convertFromObjectConfig = configuration => {
    return typeof configuration === "object" && !Array.isArray(configuration) ? [configuration] : configuration;
}

module.exports = {
    resolveEnvironment
}