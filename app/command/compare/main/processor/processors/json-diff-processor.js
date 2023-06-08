const jsonDiff = require("json-diff");
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
    let diff = jsonDiff.diffString(left, right, {color: false, full: false});
    return _processDiff(diff);
}

const _processDiff = (diff) => {
    if (diff) {
        const newValues = diff.split("\n").filter(item => item.trim().startsWith("+"));
        const oldValues = diff.split("\n").filter(item => item.trim().startsWith("-"));
        newValues.forEach(newValue => {
            diff = diff.replaceAll(newValue, `<span class="plus">${newValue.trim()}</span>`)
        });
        oldValues.forEach(oldValue => {
            diff = diff.replaceAll(oldValue, `<span class="minus">${oldValue.trim()}</span>`)
        });
        diff = diff.replaceAll("...\n", "");
    }
    return diff;
}

module.exports = {
    processJson,
    canProcess
}