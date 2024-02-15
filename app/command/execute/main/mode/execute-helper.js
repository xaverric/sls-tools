const {CONSOLE_LOG} = require("../../../../logger/logger");

/**
 *
 * @param executionItem
 * @param slsToolsApi
 * @param options
 * @returns {Promise<*>}
 */
const executeWithRepeat = async (executionItem, slsToolsApi, options) => {
    for (let i = 0, repeatLimit = 5; i < repeatLimit; i++) {
        try {
            const scriptDtoOut = await executionItem.script(slsToolsApi, options);

            if (scriptDtoOut?.status === "NOK") {
                CONSOLE_LOG.error(`The script returned NOK status with the message: "${scriptDtoOut.message}"`);
                return;
            }
            return scriptDtoOut?.dtoOut;
        } catch (e) {
            CONSOLE_LOG.error(e.message);
        }
    }
}

module.exports = {
    executeWithRepeat
}