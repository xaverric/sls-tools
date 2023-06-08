const {compile} = require("../../../../utils/handlebars/handlebars-template-helper");
const path = require("path");

const HTML_TEMPLATE_PATH = path.join(__dirname, "compare-result-teplate.handlebars");

const buildCompareResultHtmlContent = (data) => {
    return compile(HTML_TEMPLATE_PATH, data);
}

module.exports = {
    buildCompareResultHtmlContent
}