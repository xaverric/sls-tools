const zipDiffProcessor = require("./processors/zip-diff-processor");
const jsonDiffProcessor = require("./processors/json-diff-processor");
const xmlDiffProcessor = require("./processors/xml-diff-processor");
const yamlDiffProcessor = require("./processors/yaml-diff-processor");

const PROCESSORS = [
    {
        canProcess: zipDiffProcessor.canProcess,
        process: zipDiffProcessor.processZip
    },
    {
        canProcess: jsonDiffProcessor.canProcess,
        process: jsonDiffProcessor.processJson
    },
    {
        canProcess: xmlDiffProcessor.canProcess,
        process: xmlDiffProcessor.processXml
    },
    {
        canProcess: yamlDiffProcessor.canProcess,
        process: yamlDiffProcessor.processYaml
    }
]

const decideProcessor = (zipEntry) => {
    let processor = PROCESSORS.find(processor => processor.canProcess(zipEntry))
    if (!processor) {
        throw new Error(`No processor found for zipEntry ${zipEntry.name}`);
    }
    return processor;
}

module.exports = {
    decideProcessor
}