const isVisualizable = exportItem => {
    return (isNonBinaryCmdExportType(exportItem) || isk8sType(exportItem)) && exportItem.visualize;
}

const isNonBinaryCmdExportType = exportItem => {
    return exportItem.exportType === "cmd" && exportItem.type !== "binary";
}

const isk8sType = exportItem => {
    return exportItem.exportType === "k8s";
}

module.exports = {
    isVisualizable
}