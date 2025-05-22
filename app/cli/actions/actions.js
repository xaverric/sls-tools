const inquirer = require("inquirer");
const { cmdArguments } = require('../cli/arguments');
const { usage } = require('../cli/usage');
const { cmdExportArguments } = require("../../command/export/cli/arguments");
const { cmdCheckArguments } = require("../../command/check/cli/arguments");
const { cmdDependencyManagerArguments } = require("../../command/dependency-manager/cli/arguments");
const { cmdCredentialsManagerArguments } = require("../../command/credentials-manager/cli/arguments");
const { cmdCompareArguments } = require("../../command/compare/cli/arguments");
const { cmdExecuteArguments } = require("../../command/execute/cli/arguments");
const { runExport, runHelp, runCheck, runDependencyManager, runCompare, runCredentialsManager, runExecute} = require('../../sls-tools');

const COMMANDS = {
  COMMAND_HELP: 'help',
  COMMAND_EXPORT: 'export',
  COMMAND_CHECK: 'check',
  COMMAND_DEPENDENCY_MANAGER: 'dependency-manager',
  COMMAND_CREDENTIALS_MANAGER: 'credentials-manager',
  COMMAND_COMPARE: 'compare',
  COMMAND_EXECUTE: 'execute'
};

async function promptCommandSelection() {
  const { command } = await inquirer.prompt([
    {
      type: 'list',
      name: 'command',
      message: 'Which command would you like to run?',
      choices: Object.values(COMMANDS).filter(cmd => cmd !== COMMANDS.COMMAND_HELP),
    },
  ]);
  return command;
}

const actions = {
  runHelp: {
    condition: () => handleCondition(
      (cmdArguments.command === COMMANDS.COMMAND_HELP || cmdArguments.help || Object.keys(cmdArguments).length === 0) && !cmdArguments.interactive
    ),
    actionArguments: () => cmdArguments,
    action: async () => await runHelp(usage)
  },
  runInteractive: {
    condition: () => handleCondition(cmdArguments.interactive && !cmdArguments.command),
    actionArguments: () => cmdArguments,
    action: async () => {
      const selectedCommandName = await promptCommandSelection();
      if (selectedCommandName) {
        cmdArguments.command = selectedCommandName; // Update global cmdArguments
        cmdArguments._unknown = undefined; // CRITICAL: Clear unknown arguments

        let actionToRun;
        // Iterate through the actions to find the one whose condition is now met
        for (const actionKey in actions) {
          // Exclude runInteractive itself. runHelp is also special and typically not selected this way.
          if (actions[actionKey] === actions.runInteractive || actions[actionKey] === actions.runHelp) {
            continue;
          }

          // Check the condition of the action.
          if (actions[actionKey].condition && actions[actionKey].condition()) {
            actionToRun = actions[actionKey];
            break; // Found the action to run
          }
        }

        if (actionToRun) {
          await actionToRun.action();
        } else {
          // Using console.error as CONSOLE_LOG might not be in scope directly
          console.error(`Error: Command "${selectedCommandName}" could not be dispatched or is not recognized.`);
        }
      } else {
        // Using console.info as CONSOLE_LOG might not be in scope directly
        console.info("No command selected.");
      }
    }
  },
  runExport: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_EXPORT, cmdExportArguments),
    actionArguments: () => cmdExportArguments,
    action: async () => await runExport({...cmdArguments, ...cmdExportArguments})
  },
  runCheck: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_CHECK, cmdCheckArguments),
    actionArguments: () => cmdCheckArguments,
    action: async () => await runCheck({...cmdArguments, ...cmdCheckArguments})
  },
  runDependencyManager: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_DEPENDENCY_MANAGER, cmdDependencyManagerArguments),
    actionArguments: () => cmdDependencyManagerArguments,
    action: async () => await runDependencyManager({...cmdArguments, ...cmdDependencyManagerArguments})
  },
  runCredentialsManager: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_CREDENTIALS_MANAGER, cmdCredentialsManagerArguments),
    actionArguments: () => cmdCredentialsManagerArguments,
    action: async () => await runCredentialsManager({...cmdArguments, ...cmdCredentialsManagerArguments})
  },
  runCompare: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_COMPARE, cmdCompareArguments),
    actionArguments: () => cmdCompareArguments,
    action: async () => await runCompare({...cmdArguments, ...cmdCompareArguments})
  },
  runExecute: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_EXECUTE, cmdExecuteArguments),
    actionArguments: () => cmdExecuteArguments,
    action: async () => await runExecute({...cmdArguments, ...cmdExecuteArguments})
  },
};

const handleCondition = (condition, args) => {
  // If interactive mode is active and no command is specified, let runInteractive handle it.
  if (cmdArguments.interactive && !cmdArguments.command && condition === false) {
    return false;
  }
  if (_isKnownAction(args)) {
    return condition;
  }
};

const _isKnownAction = (args) => {
  // In interactive mode, _unknown might be set initially, so we bypass this check if cmdArguments.interactive is true.
  if (cmdArguments.interactive) return true;
  return !cmdArguments?._unknown || !args?._unknown;
}

module.exports = {
  actions,
  COMMANDS
};
