const util = require('util');
const {LOG} = require("../logger/logger");
const exec = util.promisify(require('child_process').exec);

const callCliCommand = async (command) => {
    LOG.debug(command);
    const {stdout} = await exec(command);
    return stdout; 
};

module.exports = {
    callCliCommand
}