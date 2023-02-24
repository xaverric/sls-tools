const scanDependencies = (object) => {
    let result = [];
    Object.keys(object.dependencies).flatMap(itemName => {
        let dependencyItem = object.dependencies[itemName];
        result.push({name: itemName, version: dependencyItem.version});
        if (dependencyItem.dependencies) {
            result = [...result, ...scanDependencies(dependencyItem)];
        }
    })
    return result;
}

const getUniqueDependencyList = (dependencies) => {
    return [...new Set(dependencies.map(item => `${item.name};${item.version}`))]
        .map(item => {
            const split = item.split(";");
            return {
                name: split[0],
                version: split[1]
            }
        });
}

module.exports = {
    scanDependencies,
    getUniqueDependencyList
}