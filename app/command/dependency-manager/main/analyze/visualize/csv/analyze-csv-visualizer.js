const fs = require("fs");
const path = require("path");
const {CONSOLE_LOG} = require("../../../../../../logger/logger");

const handleCsvVisualization = (cmdArgs, analysisResult, options) => {
    let csv = ["name;version"];
    Object.keys(analysisResult).forEach(item => {
        analysisResult[item].forEach(itemVersion => {
            csv.push(`${itemVersion.name};${itemVersion.version}`);
        })
    })
    storeDependencyAnalysis(cmdArgs, options.projectPath, csv);
}

const storeDependencyAnalysis = (cmdArgs, projectPath, csv) => {
    const path = decidePath(cmdArgs, projectPath);
    fs.writeFileSync(path, csv.join("\n"), "utf-8");
    CONSOLE_LOG.info(`Analysis (CSV) published to ${path}.`)
}

const decidePath = (cmdArgs, projectPath) => {
    return cmdArgs.mode === "file" ? path.resolve(cmdArgs.path, "dependency-analysis.csv") : path.resolve(projectPath, "dependency-analysis.csv");
}

module.exports = {
    handleCsvVisualization
}