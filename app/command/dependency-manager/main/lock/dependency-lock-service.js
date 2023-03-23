const {handleGitLock} = require("./mode/git/git-dependency-locker");
const {handleFileLock} = require("./mode/file/file-dependency-locker");

const LOCKERS = [
    {
        condition: (mode) => mode === "git",
        action: handleGitLock
    },
    {
        condition: (mode) => mode === "file",
        action: handleFileLock
    }
]

const _decideLocker = (mode) => {
    let lockers = LOCKERS.find(analyzer => analyzer.condition(mode))
    if (!lockers) {
        throw new Error(`No locker found for mode ${mode}`);
    }
    return lockers;
}

const lock = async (cmdArgs, configuration) => {
    await _decideLocker(cmdArgs.mode).action(cmdArgs, configuration);
}

module.exports = {
    lock
}

