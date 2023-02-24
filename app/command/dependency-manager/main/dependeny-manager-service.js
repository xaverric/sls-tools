const {analyze} = require("./analyze/dependency-analyzer-service");

const dependencyManager = async (cmdArgs, configuration) => {
    cmdArgs.analyze && await analyze(cmdArgs, configuration);
}

module.exports = {
    dependencyManager
}