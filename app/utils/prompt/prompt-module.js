const inquirer = require("inquirer");

const promptProceedAction = async (configuration, cmdArgs) => {
    const answer = await inquirer.prompt([
        {
            type: 'confirm',
            message: `Environment/s ${configuration.map(item => item?.uuApp?.name).join(", ")} to be processed with ${cmdArgs.command} command. Do you want to proceed?`,
            name: 'filter'
        }
    ]);
    return answer.filter;
}

const promptSecret = async () =>{
    const answer = await inquirer.prompt([
        {
            type: "password",
            name: "secret",
            message: `Secure store password (default): `
        }
    ]);
    return answer.secret;
}

const promptAccessCodes = async () =>{
    const answer = await inquirer.prompt([
        {
            type: "password",
            name: "accessCode1",
            message: `Access Code 1: `
        },
        {
            type: "password",
            name: "accessCode2",
            message: `Access Code 2: `
        }
    ]);
    return answer;
}

module.exports = {
    promptProceedAction,
    promptSecret,
    promptAccessCodes
}