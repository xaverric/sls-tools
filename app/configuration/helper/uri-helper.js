

const createBaseUri = (configuration) => {
    let host = configuration.uuApp.host;
    for (const subApp of configuration.uuApp.subAppList) {
        subApp.baseUri = `${host}/${subApp.context}/${subApp.workspace}`
    }
    return configuration;
}
const baseUriMergeCmd = (configuration) => {
    let baseUris = new Map();
    for (const subApp of configuration.uuApp.subAppList) {
        baseUris.set(subApp.context,subApp.baseUri)
    }
    for (const cmdExport of configuration.exports) {
       cmdExport.baseUri = `${baseUris.has(cmdExport.uuApp)}/${cmdExport.command}`

    }

    return configuration;
}

module.exports = {
    createBaseUri,
    baseUriMergeCmd
}