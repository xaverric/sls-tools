const jsondiffpatch = require('jsondiffpatch');
const {CONSOLE_LOG} = require("../../../../../logger/logger");

const processJson = (zipEntry, zipEntries) => {
    CONSOLE_LOG.info("processing json entry " + zipEntry.entryName);
    const leftData = JSON.parse(zipEntry.getData().toString("utf8"));
    const rightZipEntry = zipEntries.getRight().find(item => item.entryName === zipEntry.entryName);
    const rightData = JSON.parse(rightZipEntry.getData().toString("utf8"));

    return {
        name: zipEntry.entryName,
        diff: _getDiff(leftData, rightData)
    }
}

const canProcess = (zipEntry) => {
    const extension = zipEntry.name.split(".").pop();
    return extension === "json";
}

const _getDiff = (left, right) => {
    let diff = jsondiffpatch.diff(left, right);
    return _processDiff(jsondiffpatch.formatters.console.format(diff));
}

const _processDiff = (diff) => {
    console.log(`before replacement - ${diff}`);
    if (diff) {
        diff = diff.replaceAll("[31m", `<span class="minus">`);
        diff = diff.replaceAll("[32m", `<span class="plus">`);
        diff = diff.replaceAll("[39m", `</span>`);
        diff = diff.replaceAll("=>", `<b>=></b>`);
        diff = diff.replace(/(\[90m)(\w+,\w+)/g, `<span style="color: #aaaac0">$2</span>`);
    }
    console.log(`after replacement - ${diff}`);
    return diff;
}

module.exports = {
    processJson,
    canProcess
}