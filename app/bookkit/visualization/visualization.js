const { CONSOLE_LOG } = require("../../logger/logger");
const buildTableData = require("./builder/table-data-builder");
const template = require("./template/chart-template");

const createUu5String = (visualization, range, data, command, configuration) => {
    CONSOLE_LOG.info(`Building uu5String for visualization (${visualization.id}), range: (${range.id})`);
    return template(
        visualization,
        range,
        buildTableData(data),
        command,
        configuration
    );
}

module.exports = createUu5String;