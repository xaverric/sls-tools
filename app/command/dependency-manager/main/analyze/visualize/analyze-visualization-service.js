const {handleBookkitVisualization} = require("./bookkit/analyze-bookkit-visualizer");
const {handleCsvVisualization} = require("./csv/analyze-csv-visualizer");

const VISUALIZERS = [
    {
        condition: (visualizationType, mode) => visualizationType === "bookkit" && mode === "git",
        action: handleBookkitVisualization
    },
    {
        condition: (visualizationType) => visualizationType === "csv",
        action: handleCsvVisualization
    }
]

const _decideAnalyzer = (visualizationType, mode) => {
    let visualizer = VISUALIZERS.find(visualizer => visualizer.condition(visualizationType, mode))
    if (!visualizer) {
        throw new Error(`No visualizer found for visualization type ${visualizationType}`);
    }
    return visualizer;
}

/**
 *
 * @param cmdArgs
 * @param analysisResult
 * @param options
 * @returns {Promise<void>}
 */
const visualize = async (cmdArgs, analysisResult, options = {uuApp: null, projectPath: null, configuration: null}) => {
    for (const visualizationType of cmdArgs.visualize) {
        await _decideAnalyzer(visualizationType, cmdArgs.mode).action(cmdArgs, analysisResult, options);
    }
}

module.exports = {
    visualize
}