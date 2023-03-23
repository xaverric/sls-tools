const lockDependency = (packageJson, analysisResult) => {
    packageJson.dependencies = Object.keys(packageJson.dependencies)
        .map(dependecyItem => getVersionFromPackageLock(dependecyItem, analysisResult))
        .reduce((acc, dependencyItem) => {
            acc[dependencyItem.name] = dependencyItem.version
            return acc;
        }, {})
    return packageJson;
}

const getVersionFromPackageLock = (dependencyItem, analysisResult) => {
    let packageLockDependencies = analysisResult[dependencyItem];
    return {
        name: packageLockDependencies[0].name,
        version: packageLockDependencies.map(item => item.version).join(" | ")
    }
}

module.exports = {
    lockDependency
}