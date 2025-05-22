#!/usr/bin/env node
const { actions } = require('./app/cli/actions/actions.js');
const { cmdArguments: originalCmdArguments } = require('./app/cli/cli/arguments.js'); // Renamed to avoid conflict
const { CONSOLE_LOG } = require("./app/logger/logger.js");

// Testable main function
async function runCliLogic(cmdArgs) {
  CONSOLE_LOG.info(`Using NodeJS ${process.version}`);
  let actionExecuted = false;
  let executedActionName = null;

  // Reset or manage cmdArguments state for each run if necessary
  // This simple override is for demonstration; a more robust solution might be needed for complex scenarios
  const currentCmdArgs = cmdArgs || originalCmdArguments;

  for (const actionName of Object.keys(actions)) {
    // Pass currentCmdArgs to condition and actionArguments if they depend on it
    // Assuming actions[actionName].condition and .actionArguments() use the module-level cmdArguments
    // which we will mock/set for tests.
    if (actions[actionName].condition()) {
      actionExecuted = true;
      executedActionName = actionName;
      // Ensure actionArguments are derived from currentCmdArgs if necessary
      // actions[actionName].actionArguments(); // This might need adjustment if it directly uses originalCmdArguments
      await actions[actionName].action();
      return { success: true, action: executedActionName }; // Indicate success and action taken
    }
  }

  processErrorMessages(actionExecuted, currentCmdArgs);
  return { success: false, action: null }; // Indicate failure or no action
}

const processErrorMessages = (actionExecuted, cmdArgs) => {
  cmdArgs?._unknown && CONSOLE_LOG.debug(`Unknown arguments used: ${cmdArgs._unknown}`);
  !actionExecuted && CONSOLE_LOG.debug('No action match the given parameters. Terminating without any action performed.');
};

// Original main function for CLI execution
const main = async () => {
  const result = await runCliLogic(originalCmdArguments);
  if (result.success) {
    process.exit(0);
  } else {
    // Potentially, processErrorMessages might have already logged.
    // Consider if additional logging or a different exit code is needed here.
    process.exit(1); // Exit with 1 if no action was successfully executed
  }
};

// Only run main if the script is executed directly
if (require.main === module) {
  main().then(() => {
    process.stdin.destroy();
  }).catch((e) => {
    CONSOLE_LOG.error(`Error in application : ${JSON.stringify(e.stack, null, 4)}`);
    process.exit(1); // Ensure exit on unhandled error in main
  });
}

module.exports = { runCliLogic }; // Export for testing
