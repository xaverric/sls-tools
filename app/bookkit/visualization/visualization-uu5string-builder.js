const buildTableData = require("./builder/table-data-builder");
const template = require("./template/table-template");

const createUu5String = (exportItem, data) => {
    return template(
        buildTableData(data, exportItem),
        exportItem
    );
}

module.exports = createUu5String;