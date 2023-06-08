const {buildCompareResultHtmlContent} = require("../template/compare-result-html-content-builder");
const {storeFile} = require("../../../../utils/fs-helper");
const {sendEmailNotification} = require("../email/email-notification-module");
const path = require("path");
const {CONSOLE_LOG} = require("../../../../logger/logger");

const FILENAME = "comparison-output.html"

const produceHtml = async (cmdArgs, configuration, zipPathEntries, comparisonResult) => {
    if (isComparisonEmpty(zipPathEntries, comparisonResult)) {
        CONSOLE_LOG.info("Comparison result empty, nothing to report.")
        return;
    }
    const htmlContent = buildCompareResultHtmlContent({
        leftName: zipPathEntries.getLeftName(),
        rightName: zipPathEntries.getRightName(),
        uniqueOnLeftSide: zipPathEntries.getSymetricDifference().left,
        uniqueOnRightSide: zipPathEntries.getSymetricDifference().right,
        comparisonResult
    });
    storeFile(configuration.tempDir, FILENAME, htmlContent);

    if (cmdArgs.emailNotification) {
        await sendEmailNotification(cmdArgs, configuration, path.resolve(configuration.tempDir, FILENAME));
    }
}

const isComparisonEmpty = (zipPathEntries, comparisonResult) => {
    return comparisonResult.length === 0 &&
        zipPathEntries.getSymetricDifference().left?.length === 0 &&
        zipPathEntries.getSymetricDifference().right?.length === 0;
}

module.exports = {
    produceHtml
}