const {CONSOLE_LOG} = require("../../../logger/logger");
const {handleCmdExport} = require("./cmd/cmd-data-exporter");
const {fullExport} = require("./zip/zip-exporter");
const {handleK8sExport} = require("./k8s/k8s-data-exporter");

const EXPORTERS = [
    {
        condition: type => type === "cmd",
        exportAction: (exportItem) => handleCmdExport(exportItem)
    },
    {
        condition: type => type === "k8s",
        exportAction: (exportItem) => handleK8sExport(exportItem)
    }
]

const _decideExporter = (type) => {
    let exporter = EXPORTERS.find(exporter => exporter.condition(type))
    if (!exporter) {
        throw new Error(`No exporter found of type ${type}`);
    }
    return exporter;
}

const exportData = async (cmdArgs, configuration) => {
    for (const exportType of cmdArgs.exportType) {
        CONSOLE_LOG.info(`Exporting data using ${exportType} export type`);
        let filteredItems = configuration.exports.filter(item => item.exportType === exportType);
        for (const exportItem of filteredItems) {
            await exportWithRepeat(exportItem);
        }
    }

    cmdArgs.fullExport && fullExport(configuration);
}

const exportWithRepeat = async (exportItem) => {
    for (let i = 0, repeatLimit = 5; i < repeatLimit; i++) {
        try {
            await _decideExporter(exportItem.exportType).exportAction(exportItem);
            // reset repeatLimit to stop processing and continue
            repeatLimit = 0;
        } catch (e) {
            CONSOLE_LOG.error(e);
        }
    }
}

module.exports = {
    exportData
}