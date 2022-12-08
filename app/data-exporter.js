const {readConfiguration} = require("./configuration/configuration-reader");
const {CONSOLE_LOG} = require("./logger/logger");
const { exportData } = require("./exporter/exporter-service");

const runExport = async (cmdArgs) => {
    let configuration = await readConfiguration(cmdArgs);
    CONSOLE_LOG.info(JSON.stringify(configuration, null, 4));
    await exportData(cmdArgs, configuration);

}

const runHelp = (usage) => {
    console.log(usage);
}

module.exports = {
    runExport,
    runHelp
}