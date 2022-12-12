const buildTableData = require("./builder/table-data-builder");
const template = require("./template/chart-template");

const createUu5String = (configuration, data) => {
    return template(
        buildTableData(data),
        configuration
    );
}

module.exports = createUu5String;