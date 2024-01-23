const {call} = require("./helpers/callCommand");
const Client = require("./helpers/Client");
const {generateToCSV} = require("./helpers/csvGenerator");
const {CONSOLE_LOG} = require("../../../../logger/logger");
const {XMLParser} = require("fast-xml-parser");
const csvtojson = require("csvtojson");
const AdmZip = require("adm-zip");
const Handlebars = require("handlebars");
const diffResultModule = require('simple-text-diff')
const DiffResult = diffResultModule.default;
const jsondiffpatch = require("jsondiffpatch");

module.exports = {
    call,
    Client,
    generateToCSV,
    CONSOLE_LOG,
    XMLParser,
    csvtojson,
    AdmZip,
    Handlebars,
    DiffResult,
    jsondiffpatch
}