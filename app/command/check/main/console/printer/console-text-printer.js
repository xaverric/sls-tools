const {CONSOLE_LOG} = require("../../../../../logger/logger");

const print = grouppedResults => {
    Object.keys(grouppedResults).forEach(group => {
        CONSOLE_LOG.info(`${group}`);
        grouppedResults[group].forEach(result => {
            CONSOLE_LOG.info(`${result.uuApp} - ${result.command} - ${result.errorMessage}`);
        })
    });
}

module.exports = print;