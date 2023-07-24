const {handleBookkitVisualization} = require("./bookkit/bookkit-visualizer");
const {handleCsvVisualization} = require("./csv/csv-visualizer");

const VISUALIZERS = [
    {
        condition: (visualizationType) => visualizationType === "bookkit",
        action: handleBookkitVisualization
    },
    {
        condition: (visualizationType) => visualizationType === "csv",
        action: handleCsvVisualization
    }
]

const _decideVisualizer = (visualizationType) => {
    let visualizer = VISUALIZERS.find(visualizer => visualizer.condition(visualizationType))
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
const visualize = async (exportItem, configuration, cmdArgs) => {
    for (const visualizationType of cmdArgs.visualize) {
        await _decideVisualizer(visualizationType, cmdArgs).action(exportItem, configuration);
    }
    if (cmdArgs.visualize?.length === 0) {
        // default visualization option
        await handleBookkitVisualization(exportItem, configuration);
    }
}

module.exports = {
    visualize
}