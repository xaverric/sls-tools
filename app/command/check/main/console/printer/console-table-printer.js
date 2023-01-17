const {CONSOLE_LOG} = require("../../../../../logger/logger");

const print = grouppedResults => {
    Object.keys(grouppedResults).forEach(group => {
        CONSOLE_LOG.info(`${group}`);
        console.table(grouppedResults[group]);
    });
}

module.exports = print;