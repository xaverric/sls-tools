const template = require("./template/table-template");
const build = require("./builder/table-data-builder");
const {updateSection} = require("../../../../../../bookkit/client/bookkit-client");
const {CONSOLE_LOG} = require("../../../../../../logger/logger");
const path = require("path");

const handleBookkitVisualization = async (cmdArgs, analysisResult, {uuApp, projectPath, configuration}) => {
    const projectPathName = path.basename(projectPath);
    CONSOLE_LOG.info(`Analysis for ${projectPathName} published.`);
    let uu5String = template(build(analysisResult), analysisResult, projectPathName, configuration);
    await updateSection(configuration.bookkit.uri, uuApp.dependencyVisualization[projectPathName].page, uuApp.dependencyVisualization[projectPathName].code, uu5String, configuration.bookkit.token);

}

module.exports = {
    handleBookkitVisualization
}