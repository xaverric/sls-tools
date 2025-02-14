const createUu5String = require("./visualization/check-visualization-uu5string-builder");
const {updateSection} = require("../../../../bookkit/client/bookkit-client");
const {CONSOLE_LOG} = require("../../../../logger/logger");

const processVisualizations = async (cmdArgs, configuration, groupedResults) => {
    CONSOLE_LOG.info(`Visualizing all checks into the bookkit page.`);
    const uu5StringContent = createUu5String(groupedResults);

    for (const groupResult of Object.values(groupedResults)) {
        await updateSection(configuration.bookkit.uri, configuration.bookkit.checkReportPageCode,
          _resolveCheckReportSectionCode(groupResult, configuration), uu5StringContent, configuration.bookkit.token);
    }
}

const _resolveCheckReportSectionCode = (groupResult, configuration) => {
    return groupResult.find(result => result.checkReportSectionCode)?.checkReportSectionCode || configuration.bookkit.checkReportSectionCode;
}


module.exports = {
    processVisualizations
}