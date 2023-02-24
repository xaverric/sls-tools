const {handleGitAnalysis} = require("./mode/git/git-dependency-analyzer");
const {handleFileAnalysis} = require("./mode/file/file-dependency-analyzer");

const ANALYZERS = [
    {
        condition: (mode) => mode === "git",
        action: handleGitAnalysis
    },
    {
        condition: (mode) => mode === "file",
        action: handleFileAnalysis
    }
]

const _decideAnalyzer = (mode) => {
    let analyzer = ANALYZERS.find(analyzer => analyzer.condition(mode))
    if (!analyzer) {
        throw new Error(`No analyzer found for mode ${mode}`);
    }
    return analyzer;
}

const analyze = async (cmdArgs, configuration) => {
    await _decideAnalyzer(cmdArgs.mode).action(cmdArgs, configuration);
}

module.exports = {
    analyze
}

