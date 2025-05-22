const { runCliLogic } = require('./cli'); // Corrected path
const inquirer = require('inquirer');
const cmdArgsModule = require('./app/cli/cli/arguments'); // Corrected path
const slsTools = require('./app/sls-tools'); // Corrected path
const configurationReader = require('./app/configuration/configuration-reader'); // Corrected path
const exporterService = require('./app/command/export/main/exporter-service'); // Corrected path

// Mock specific modules if their internal workings are not part of the test
jest.mock('./app/sls-tools', () => ({
  runExport: jest.fn().mockResolvedValue(),
  runHelp: jest.fn().mockResolvedValue(),
  // Add mocks for other tools if they get called during tests
  runCheck: jest.fn().mockResolvedValue(),
  runDependencyManager: jest.fn().mockResolvedValue(),
  runCredentialsManager: jest.fn().mockResolvedValue(),
  runCompare: jest.fn().mockResolvedValue(),
  runExecute: jest.fn().mockResolvedValue(),
}));

jest.mock('./app/logger/logger.js', () => ({
  CONSOLE_LOG: {
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
  LOG: { // If LOG is also used directly
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  }
}));

// Mock fs-helper specifically for loadFile to control configuration loading
const fsHelper = require('./app/utils/fs-helper');
jest.mock('./app/utils/fs-helper', () => ({
  ...jest.requireActual('./app/utils/fs-helper'), // Keep other fs-helper functions real if needed
  loadFile: jest.fn(), // Mock loadFile
}));


describe('Interactive Prompt Feature Tests', () => {
  beforeEach(() => {
    // Reset mocks and argument module state before each test
    inquirer.prompt.mockReset(); // Ensures prompt mock state is clean for each test
    fsHelper.loadFile.mockReset(); // Reset loadFile mock

    // Clear all mocks from slsTools
    Object.values(slsTools).forEach(mockFn => {
      if (jest.isMockFunction(mockFn)) {
        mockFn.mockClear();
      }
    });
    
    // Reset cmdArguments to a default state for each test by re-evaluating arguments.js (simulated)
    // We need to ensure all known arguments from arguments.js are present on cmdArgsModule.cmdArguments
    const definitions = require('./app/cli/cli/arguments.js').cmdArgumentsDefinition;
    const defaults = {};
    definitions.forEach(def => {
      if (def.defaultValue !== undefined) {
        defaults[def.name] = def.defaultValue;
      } else if (def.type === Boolean) {
        defaults[def.name] = false;
      } else if (def.multiple) {
        defaults[def.name] = [];
      } else {
        defaults[def.name] = undefined;
      }
    });
    defaults._unknown = undefined; // Crucial

    Object.keys(cmdArgsModule.cmdArguments).forEach(key => {
      delete cmdArgsModule.cmdArguments[key];
    });
    Object.assign(cmdArgsModule.cmdArguments, defaults);
  });

  // Test 1: Interactive Command Selection
  test('Test 1: should prompt for command selection when --interactive is used', async () => {
    // Setup initial state for cmdArguments for this test
    cmdArgsModule.cmdArguments.interactive = true;
    cmdArgsModule.cmdArguments.exportType = []; // Ensure exportType is defined as export action might expect it
    cmdArgsModule.cmdArguments._unknown = undefined; // Critical for condition evaluation

    inquirer.prompt.mockResolvedValueOnce({ command: 'export' });
    fsHelper.loadFile.mockResolvedValue([{ uuApp: { name: "test-env", version: "1.0" }, bookkit: {}, exports: [] }]);

    const result = await runCliLogic(cmdArgsModule.cmdArguments);

    expect(inquirer.prompt).toHaveBeenCalledTimes(1);
    expect(inquirer.prompt).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'command',
          message: 'Which command would you like to run?',
        }),
      ])
    );
    expect(slsTools.runExport).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(true);
    expect(result.action).toBe('runInteractive'); // runInteractive then calls runExport
  });

  // Test 2: Interactive environment Parameter Selection
  test('Test 2: should prompt for environment when export --interactive is used', async () => {
    cmdArgsModule.cmdArguments.interactive = true;
    cmdArgsModule.cmdArguments.command = 'export';
    cmdArgsModule.cmdArguments.exportType = []; // export action expects this
    cmdArgsModule.cmdArguments._unknown = undefined;

    // Mock for promptCommandSelection (if called, though not the focus here)
    // Mock for promptForEnvironment in configuration-reader
    // promptForEnvironment's inquirer call expects a direct string answer for 'list' type
    inquirer.prompt
        .mockResolvedValueOnce({ selectedEnvironment: 'test-env' }); // For promptForEnvironment

    fsHelper.loadFile.mockResolvedValue([{ uuApp: { name: "test-env", version: "1.0" }, bookkit: {}, exports: [] }]);
    
    await runCliLogic(cmdArgsModule.cmdArguments);

    // This assertion might be fragile if command selection prompt is also triggered.
    // It should ideally be 1 if command is pre-set.
    expect(inquirer.prompt).toHaveBeenCalledTimes(1); 
    expect(inquirer.prompt).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({
        name: 'selectedEnvironment', // Name used in promptForEnvironment (this is the 'name' of the question object)
        message: "Select environment for the 'export' command:",
        choices: ["All Environments", "test-env"]
      })
    ]));
    
    // Check that cmdArgs.environment was updated by readConfiguration
    expect(cmdArgsModule.cmdArguments.environment).toEqual(['test-env']);
    // runExport would be called, ensure mock is set up if its full execution isn't desired
    expect(slsTools.runExport).toHaveBeenCalled(); 
  });


  // Test 3: Interactive exportType Parameter Selection
  test('Test 3: should prompt for exportType when export --interactive is used', async () => {
    cmdArgsModule.cmdArguments.interactive = true;
    cmdArgsModule.cmdArguments.command = 'export';
    cmdArgsModule.cmdArguments.environment = ['test-env'];
    cmdArgsModule.cmdArguments.exportType = []; // Initialize, exporter-service will prompt to fill it
    cmdArgsModule.cmdArguments._unknown = undefined;

    inquirer.prompt.mockResolvedValueOnce({ exportType: ['cmd'] }); 

    fsHelper.loadFile.mockResolvedValueOnce([{ 
        uuApp: { name: "test-env", version: "1.0" }, 
        bookkit: {}, 
        exports: [{id:"item1", exportType: "cmd"}, {id:"item2", exportType: "k8s"}] 
    }]);

    await runCliLogic(cmdArgsModule.cmdArguments);

    expect(inquirer.prompt).toHaveBeenCalledTimes(1);
    expect(inquirer.prompt).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({
        name: 'exportType', // This is the 'name' of the question object in promptForChoices
        message: 'Select export type(s):',
        type: 'checkbox',
        choices: ["cmd", "k8s"]
      })
    ]));
    // Check that cmdArgs.exportType was updated by exporter-service logic
    expect(cmdArgsModule.cmdArguments.exportType).toEqual(['cmd']);
    expect(slsTools.runExport).toHaveBeenCalled();
  });

  // Test 4: --noprompt disables command selection prompt
  test('Test 4: should not prompt for command when --interactive --noprompt is used', async () => {
    cmdArgsModule.cmdArguments.interactive = true;
    cmdArgsModule.cmdArguments.noprompt = true;
    cmdArgsModule.cmdArguments.exportType = []; // Default
    cmdArgsModule.cmdArguments._unknown = undefined;

    // Add a mock for the potential call to promptCommandSelection to avoid TypeError,
    // even though the assertion is that it should NOT be called.
    // This makes the test robust to the current state of actions.js.
    inquirer.prompt.mockResolvedValueOnce({ command: 'help' }); // Fallback if called

    const result = await runCliLogic(cmdArgsModule.cmdArguments);

    // This assertion will FAIL until actions.js runInteractive respects noprompt
    expect(inquirer.prompt).not.toHaveBeenCalled(); 
    // This assertion relies on actions.js runInteractive.condition or action being modified 
    // to check for cmdArguments.noprompt.
    // If not modified, inquirer.prompt WILL be called, and this test will fail.
    // Assuming the feature (--noprompt) is meant to work, this test reflects that desired state.
    // The current code for runInteractive does not check noprompt, so it will call prompt.
    // To make this test accurately reflect current (buggy) state, we'd expect prompt to be called.
    // But the subtask is to test the "feature", implying its correct operation.
    // For now, this test will likely fail, highlighting the bug in actions.js.
    expect(result.success).toBe(false); // No command action should be taken.
                                        // runInteractive might run but do nothing if it checks noprompt internally.
                                        // Or, if its condition checks noprompt, it won't run at all.
  });

  // Test 5: --noprompt disables parameter selection prompt
  test('Test 5: should not prompt for environment when export --interactive --noprompt is used', async () => {
    cmdArgsModule.cmdArguments.command = 'export';
    cmdArgsModule.cmdArguments.interactive = true;
    cmdArgsModule.cmdArguments.noprompt = true;
    cmdArgsModule.cmdArguments.exportType = []; // Default
    cmdArgsModule.cmdArguments._unknown = undefined;

    fsHelper.loadFile.mockResolvedValueOnce([{ uuApp: { name: "test-env", version: "1.0" }, bookkit: {}, exports: [] }]);
    // Add a mock for potential calls to parameter prompts to avoid TypeErrors
    // even though the assertion is that they should NOT be called.
    inquirer.prompt.mockResolvedValueOnce({ selectedEnvironment: 'test-env' }) // For environment prompt
                   .mockResolvedValueOnce({ exportType: ['cmd'] });      // For exportType prompt

    await runCliLogic(cmdArgsModule.cmdArguments);

    // This assertion will FAIL until configuration-reader.js and exporter-service.js respect noprompt
    expect(inquirer.prompt).not.toHaveBeenCalled(); 
    // This assertion relies on configuration-reader.js and exporter-service.js
    // being modified to check for cmdArgs.noprompt before prompting.
    // If not modified, inquirer.prompt WILL be called.
    // This test reflects the desired state of the --noprompt feature.
    // It will likely fail with current code, highlighting bugs in those modules.
    expect(slsTools.runExport).toHaveBeenCalled(); // Export action should still be called.
  });
});
