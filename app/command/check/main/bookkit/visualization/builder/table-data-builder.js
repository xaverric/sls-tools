const ERROR_COLOR_SCHEME = {
    colorSchema: "red",
    bgStyle: "filled"
};

const OK_COLOR_SCHEME = {
    colorSchema: "blue",
    bgStyle: "filled"
};

/**
 * Builder function providing the data needed for visualization of table
 *
 */
const build = (data) => {
    return [
        getTableColumns(),
        getTableData(data)
    ]
}

const getTableColumns = () => {
    return ["uuApp", "command", "checkGroup", "description", "validationStatus", "errorMessage"]
        .map(key => {
            return {header: key}
        });
}

const getTableData = (data) => {
    let groups = Object.keys(data);
    let result = {};
    groups.forEach(group => {
        result[group] = data[group].map(item => {
            return {
                value: Object.values(item),
                style: item.validationStatus === "NOK" ? ERROR_COLOR_SCHEME : OK_COLOR_SCHEME
            }
        });
    });
    return result;
}

module.exports = build