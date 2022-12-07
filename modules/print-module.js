const {CONSOLE_LOG, LOG} = require("./../logger/logger");

const OBJECT_HEADER = "subApp";

const guessKeys = array => {
    return  array[0] ? Object.keys(array[0]).filter(item => item !== OBJECT_HEADER) : [];
}

const isNotEmpty = value => {
    return !!value;
}

const printMessages = (key, messages, logger) => {
    messages.forEach(message => {
        logger.debug(`${message.subApp} - ${message[key]}`);
    });
    if (messages.length === 0) {
        logger.debug("Nothing to report...")
    }
}

const printLineContent = (array, cmdArgs, logger) => {
    guessKeys(array).forEach(key => {
        logger.debug(`------- Evaluating ${key} for ${cmdArgs.environment.toUpperCase()} -------`);
        let messages = array.filter(subApp => isNotEmpty(subApp[key]));
        printMessages(key, messages, logger);
    });
}

const print = (array, cmdArgs) => {
    CONSOLE_LOG.debug(`------------------------------ ${cmdArgs.environment.toUpperCase()} ------------------------------`)
    if (cmdArgs.table) {
        CONSOLE_LOG.debug(`------- Evaluating ${guessKeys(array)} for ${cmdArgs.environment.toUpperCase()} -------`);
        console.table(array);
    }
    printLineContent(array, cmdArgs, cmdArgs.table ? LOG : CONSOLE_LOG);
}

module.exports = {
    print
}