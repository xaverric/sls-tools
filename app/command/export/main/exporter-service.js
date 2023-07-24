const {CONSOLE_LOG} = require("../../../logger/logger");
const {handleCmdExport} = require("./cmd/cmd-data-exporter");
const {fullExport} = require("./zip/zip-exporter");
const {handleK8sExport} = require("./k8s/k8s-data-exporter");
const {visualize} = require("./visualize/visualization-service");
const {processFullExportUpload} = require("./bookkit/full-export-upload-service");

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
    CONSOLE_LOG.info(`Processing export for environment: ${configuration.uuApp.name}`);
    for (const exportType of cmdArgs.exportType) {
        CONSOLE_LOG.info(`Exporting data using ${exportType} export type`);
        let filteredItems = configuration.exports.filter(item => item.exportType === exportType);
        filteredItems = filterById(cmdArgs, configuration, filteredItems);

        await processExportItems(filteredItems, exportWithRepeat);
        cmdArgs.visualize && await processExportItems(filteredItems, (exportItem) => visualize(exportItem, configuration, cmdArgs));
    }

    cmdArgs.fullExport && fullExport(configuration);
    cmdArgs.fullExport && cmdArgs.upload && await processFullExportUpload(configuration);
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

const processExportItems = async (exportItems, fnc) => {
    for (const exportItem of exportItems) {
        await fnc(exportItem);
    }
}

const filterById = (cmdArgs, configuration, filteredItems) => {
    return cmdArgs.idFilter ? filteredItems.filter(item => cmdArgs.idFilter.includes(item.id)) : filteredItems;
}

module.exports = {
    exportData
}