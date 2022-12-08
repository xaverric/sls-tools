const {default: axios} = require("axios");
const {CONSOLE_LOG} = require("../logger/logger");

/**
 * call any command over uuApp API
 * @param url - URL to be called
 * @param data - dtoIn object of the command
 * @param method - method for the command call (POST|GET)
 * @param token - authorization token
 * @param options - additional options for command call
 * @returns {Promise<any>}
 */
const callCommand = async (url, method, data, token = null, options = {}) => {
    CONSOLE_LOG.info(`Call command ${url}`);
    const response = await axios(_prepareAxiosConfig(url, data, method, token, options));
    return response.data;
};

const _prepareAxiosConfig = (url, data, method, token = null, options = {}) => {
    const config = {
        url: url,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        method: token ? method : 'POST',
        data: JSON.stringify(data)
    };
    if (options?.binaryContent && options?.binaryContent === "binary") {
        config.responseType = "arraybuffer";
        config.headers = {
            'Content-Type': 'application/zip'
        }
    }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

module.exports = {callCommand}