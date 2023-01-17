const buildTableData = require("./builder/table-data-builder");
const template = require("./template/table-template");

const createUu5String = (data) => {
    return template(
        buildTableData(data)
    );
}

module.exports = createUu5String;