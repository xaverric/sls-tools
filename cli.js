#!/usr/bin/env node
const { actions } = require('./app/cmd/actions/actions.js');
const { cmdArguments } = require('./app/cmd/cli/arguments.js');
const { CONSOLE_LOG } = require("./app/logger/logger.js");

const main = async () => {
  console.log(`Using NodeJS ${process.version}`);
  let actionExecuted = false;
  for (const actionName of Object.keys(actions)) {
    // execute first action which meets the condition and terminate the process
    if (actions[actionName].condition()) {
      actionExecuted = true;
      await actions[actionName].action();
    }
  }
  // the process should never get here
  processErrorMessages(actionExecuted);
};

const processErrorMessages = (actionExecuted) => {
  cmdArguments._unknown && CONSOLE_LOG.debug(`Unknown arguments used: ${cmdArguments._unknown}`);
  !actionExecuted && CONSOLE_LOG.debug('No action match the given parameters. Terminating without any action performed.');
};

main().then(() => {
  process.stdin.destroy();
}).catch((e) => {
  CONSOLE_LOG.error(`Error in application : ${e.stack}`);
});
