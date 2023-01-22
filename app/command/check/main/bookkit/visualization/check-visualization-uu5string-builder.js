const buildTableData = require("./builder/table-data-builder");
const buildChartData = require("./builder/chart-data-builder");
const template = require("./template/dashboard-template");

const createUu5String = (data) => {
    return template(
        buildTableData(data),
        buildChartData(data)
    );
}

module.exports = createUu5String;