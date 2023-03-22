const yaml = require('js-yaml');
const fs = require ("fs");
const path = require ("path");
const {CONSOLE_LOG} = require("../logger/logger");

/**
 * Create directory on given path recursively if does not exist.
 *
 * @param directoryPath
 */
const createDirectoryIfNotExist = directoryPath => {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
        CONSOLE_LOG.info(`Directory structure ${directoryPath} created.`);
    }
}

const getFilePath = (directory, fileName) => {
    return path.resolve(directory, fileName);
}

/**
 * Stores file with given filename into the given location. In case the folder does not exist, it gets created recursively.
 *
 * @param directory
 * @param fileName
 * @param content
 */
const storeFile = (directory, fileName, content) => {
    createDirectoryIfNotExist(directory);
    fs.writeFileSync(getFilePath(directory, fileName), content, "utf-8");
    CONSOLE_LOG.info(`${getFilePath(directory, fileName)} created`);
}

const loadFile = async path => {
    let file = require(path);
    if (typeof file === "function") {
        let loadedFile = await file();
        return loadedFile;
    }
    return file;
}

/**
 * Read JSON file from given file path location and parse its content to the object
 *
 * @param {string} filePath
 * @returns
 */
const loadJsonFile = filePath => {
    let data;
    try {
        data = JSON.parse(fs.readFileSync(path.resolve(filePath)));
    } catch (err) {
        throw new Error(`Error occurred during loading file ${filePath}. Err: ${err}`);
    }
    return data;
};

/**
 * Reads config map from provided yaml file (config must be stored under data.SERVER_CFG key
 *
 * @param filePath
 * @returns {any}
 */
const loadConfigMap = (filePath) => {
    try {
        const doc = yaml.load(fs.readFileSync(filePath));
        return JSON.parse(doc.data.SERVER_CFG);
    } catch (err) {
        throw new Error(`Error occurred during loading file ${filePath}. Err: ${err}`);
    }
}

module.exports = {
    storeFile,
    loadFile,
    loadJsonFile,
    loadConfigMap,
    getFilePath,
    createDirectoryIfNotExist
}