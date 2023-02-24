const build = data => {
    return [
        getColumns(),
        getData(data)
    ]
}

const getColumns = () => {
    return ["name", "version"]
        .map(key => {
            return {header: key};
        });
}

const getData = (data) => {
    let groups = Object.keys(data);
    let result = [];
    groups.forEach(group => {
        data[group].forEach(grouItem => {
            result.push(Object.values(grouItem));
        });
    });
    return result;
}

module.exports = build;