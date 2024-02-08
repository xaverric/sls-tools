const {handleFullExe} = require("./mode/full/full-execute");
const {handleNoEnvExe} = require("./mode/noEnv/noEnv-execute");

const EXECUTIONS = [
    {
        condition: (mode) => mode === "full" || mode === undefined,
        action: handleFullExe
    },
    {
        condition: (mode) => mode === "noEnv",
        action: handleNoEnvExe
    }
]

const _decideExecute = (mode) => {
    let exe = EXECUTIONS.find(e => e.condition(mode))
    if (!exe) {
        throw new Error(`No execution found for mode ${mode}`);
    }
    return exe;
}

const execute = async (cmdArgs, configuration) => {
    await _decideExecute(cmdArgs.mode).action(cmdArgs, configuration);
}

module.exports = {
    execute
}