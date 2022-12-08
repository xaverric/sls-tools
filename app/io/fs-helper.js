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
    fs.writeFileSync(getFilePath(directory, fileName), content);
    CONSOLE_LOG.info(`File ${fileName} stored successfully into the "${directory}" location.`);
}

const loadFile = async path => {
    let file = require(path);
    if (typeof file === "function") {
        let loadedFile = await file();
        return loadedFile;
    }
    return file;
}

module.exports = {
    storeFile,
    loadFile,
    getFilePath,
    createDirectoryIfNotExist
}