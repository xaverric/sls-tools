const {default: axios} = require("axios");
const FormData = require("form-data");
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
    CONSOLE_LOG.debug(`Call command ${url}`);
    try {
        const response = await axios(_prepareAxiosConfig(url, data, method, token, options));
        return response?.data;
    } catch (e) {
        CONSOLE_LOG.info(e);
        CONSOLE_LOG.error(JSON.stringify(e?.response?.data, null, 4));
        return e.response?.data;
    }
};

const _prepareAxiosConfig = (url, data, method, token = null, options = {}) => {
    const config = {
        url: url,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Accept-Encoding": "gzip,deflate,compress"
        },
        method: method,
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

const callFormPostCommand = async (url, data, token) => {
    CONSOLE_LOG.info(`Call command ${url}`);
    const formData = new FormData();
    formData.append("data", data);
    const response = await axios.post(url, formData, {
        headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${token}`,
            "Accept-Encoding": "gzip,deflate,compress"
        }
    });
    return response.data;
};

module.exports = {
    callCommand,
    callFormPostCommand
}