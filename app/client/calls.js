const {default: axios} = require("axios");

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
    console.log(`Call command ${url}`);
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
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (options?.binaryContent) {
        config.responseType = "arraybuffer";
    }
    return config;
};

module.exports = {callCommand}