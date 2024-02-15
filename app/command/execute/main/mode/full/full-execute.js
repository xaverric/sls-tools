const {CONSOLE_LOG} = require("../../../../../logger/logger");
const {groupBy} = require("../../../../../utils/group-by");
const slsToolsApi = require("../../api/sls-tools-api");
const {executeWithRepeat} = require("../execute-helper");

const handleFullExe = async (cmdArgs, configuration) => {
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

module.exports = {
    handleFullExe
}