const groupBy = (array, key) => {
    return array.reduce((acc, item) => {
        acc[item[key]] = acc[item[key]] || [];
        acc[item[key]].push(item);
        return acc;
    }, {});
}

module.exports = {
    groupBy
}