const createUu5String = require("./visualization/table-visualization-uu5string-builder");
const {updateSection} = require("../../../../bookkit/client/bookkit-client");
const {CONSOLE_LOG} = require("../../../../logger/logger");

const processVisualizations = async (cmdArgs, configuration, groupedResults) => {
    CONSOLE_LOG.info(`Visualizing all checks into the bookkit page.`);
    const uu5StringContent = createUu5String(groupedResults);
    await updateSection(configuration.bookkit.uri, configuration.bookkit.checkReportPageCode, configuration.bookkit.checkReportSectionCode, uu5StringContent, configuration.bookkit.token);
}

module.exports = {
    processVisualizations
}