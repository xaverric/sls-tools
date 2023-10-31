const {CONSOLE_LOG} = require("../../../logger/logger");
const {groupBy} = require("../../../utils/group-by");
const slsToolsApi = require("./api/sls-tools-api");

const execute = async (cmdArgs, configuration) => {
    CONSOLE_LOG.info(`Processing execute for environment: ${configuration.uuApp.name}`);
    const executeGroups = groupBy(configuration.execute, "group");
    const filteredGroups = Object.keys(executeGroups).filter(groupName => cmdArgs?.group?.includes(groupName));
    for (const executeGroup of (filteredGroups || [])) {
        CONSOLE_LOG.info(`Executing scripts from group ${executeGroup}`);
        let lastDtoOut = undefined;
        for (const executionItem of executeGroups[executeGroup]) {
            CONSOLE_LOG.info(`Executing script ${executionItem.name}`);
            lastDtoOut = await executeWithRepeat(
                executionItem,
                slsToolsApi,
                {
                    cmdArgs,
                    configuration,
                    lastDtoOut,
                    uuAppList: executionItem.uuAppList
                });
        }
    }
}

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
    execute
}