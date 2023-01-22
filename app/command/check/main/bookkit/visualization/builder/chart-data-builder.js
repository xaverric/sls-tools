const ERROR_COLOR_SCHEME = {
    colorSchema: "red",
    bgStyle: "filled"
};

const OK_COLOR_SCHEME = {
    colorSchema: "blue",
    bgStyle: "filled"
};

const build = data => {
    return [
        getChartSeries(data),
        getChartData(data),
        getTableChartColumns(),
        getTableChartData(data)
    ]
}

const getChartSeries = (data) => {
    let result = {};
    Object.keys(data).forEach(group => {
        result[group] = [
            {
                name: group,
                labelKey: "label",
                valueKey: "value",
                colorSchema: [
                    "blue-rich",
                    "red-rich"
                ]
            }
        ];
    });
    return result;
}

const getChartData = (data) => {
    let groups = Object.keys(data);
    let result = [];
    groups.forEach(group => {
        result[group] = [
            {
                label: "OK",
                value: data[group].filter(item => item.validationStatus === "OK").length
            },
            {
                label: "NOK",
                value: data[group].filter(item => item.validationStatus === "NOK").length
            }
        ];
    });
    return result;
}

const getTableChartColumns = () => {
    return ["description", "validationStatus"]
        .map(key => {
            return {header: key, highlighted: key === "validationStatus"};
        });
}

const getTableChartData = (data) => {
    let groups = Object.keys(data);
    let result = {};
    groups.forEach(group => {
        result[group] = data[group].map(item => {
            return {
                value: [item.description, item.validationStatus],
                style: item.validationStatus === "NOK" ? ERROR_COLOR_SCHEME : OK_COLOR_SCHEME
            }
        });
    });
    return result;
}

module.exports = build;