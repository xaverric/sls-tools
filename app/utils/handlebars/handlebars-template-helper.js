const Handlebars = require('handlebars');
const fs = require('fs');

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

/**
 * Receives template file path and data for the give template and returns compiled string result.
 * @param filePath
 * @param templateData
 * @returns {string}
 */
const compile = (filePath, templateData) => {
    const template = fs.readFileSync(filePath, "utf-8");
    const compiledTemplate = Handlebars.compile(template, { noEscape: true });
    return compiledTemplate(templateData).toString();
};

module.exports = {
    compile
};
