const fs = require("fs");
const path = require("path");

/**
 * Read JSON file from given file path location and parse its content to the object
 *  
 * @param {string} filePath 
 * @returns 
 */
const readJsonFile = filePath => {
    let data;
    try {
        data = JSON.parse(fs.readFileSync(filePath));
    } catch (err) {
        throw new Error(`Error occurred during loading file ${filePath}. Err: ${err}`);
    }
    return data;
};

const readEnvironmentConfiguration = cmdArgs => {
    let filePath = path.resolve(`${cmdArgs.config}/${cmdArgs.environment}.json`);
    return readJsonFile(filePath);
};

const readContextConfiguration = cmdArgs => {
    let filePath = path.resolve(`${cmdArgs.config}/contexts.json`);
    let contexts = readJsonFile(filePath);
    let environmentDetails = contexts.find(context => context.environment === cmdArgs.environment);
    return environmentDetails
};

const readNodeSizeConfiguration = cmdArgs => {
    let filePath = path.resolve(`${cmdArgs.config}/nodesizes.json`);
    return readJsonFile(filePath);
}

module.exports = {
    readEnvironmentConfiguration,
    readContextConfiguration,
    readNodeSizeConfiguration
}