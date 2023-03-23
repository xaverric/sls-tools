const {analyze} = require("./analyze/dependency-analyzer-service");
const {lock} = require("./lock/dependency-lock-service");

const dependencyManager = async (cmdArgs, configuration) => {
    cmdArgs.analyze && await analyze(cmdArgs, configuration);
    cmdArgs.lock && await lock(cmdArgs, configuration);
}

module.exports = {
    dependencyManager
}