const util = require('util');
const exec = util.promisify(require('child_process').exec);

const callCommand = async (command) => {
    const {stdout} = await exec(command);
    return stdout; 
};

module.exports = {
    callCommand
}