#!/usr/bin/env node
const { actions } = require('./app/cli/actions/actions.js');
const { cmdArguments } = require('./app/cli/cli/arguments.js');
const { CONSOLE_LOG } = require("./app/logger/logger.js");

const main = async () => {
  CONSOLE_LOG.info(`Using NodeJS ${process.version}`);
  let actionExecuted = false;
  let actionArguments = cmdArguments;
  for (const actionName of Object.keys(actions)) {
    // execute first action which meets the condition and terminate the process
    if (actions[actionName].condition()) {
      actionExecuted = true;
      actionArguments = actions[actionName].actionArguments();
      await actions[actionName].action();
      process.exit(0);
    }
  }
  // the process should never get here
  processErrorMessages(actionExecuted, actionArguments);
};

const processErrorMessages = (actionExecuted, actionArguments) => {
  actionArguments?._unknown && CONSOLE_LOG.debug(`Unknown arguments used: ${actionArguments._unknown}`);
  !actionExecuted && CONSOLE_LOG.debug('No action match the given parameters. Terminating without any action performed.');
};

main().then(() => {
  process.stdin.destroy();
}).catch((e) => {
  CONSOLE_LOG.error(`Error in application : ${JSON.stringify(e.stack, null, 4)}`);
});
