const fs = require("fs");
const {CONSOLE_LOG} = require("../../logger/logger");
const execSync = require("child_process").execSync;

/**
 * Creates env for GIT commands.
 *
 * @param projectPath path to project
 * @returns env for project
 * @private
 **/
const _createEnv = (projectPath) => {
    return {
        env: {
            "GIT_DIR": projectPath + "/.git",
            "GIT_WORK_TREE": projectPath
        }
    };
}

/**
 * Clones a git repository to a checkout directory. If the directory already exists and is not empty,
 * cloning is skipped.
 *
 * @param uuApp single project configuration
 * @param configuration configuration
 */
const clone = (uuApp, configuration) => {
    if (fs.existsSync(uuApp.gitCheckoutDir) && fs.readdirSync(uuApp.gitCheckoutDir).length > 0) {
        CONSOLE_LOG.info(`Project ${uuApp.gitName} won't be cloned because checkout directory ${uuApp.gitCheckoutDir} is not empty. Assuming the project is already cloned.`);
    } else {
        CONSOLE_LOG.info(`Cloning project ${uuApp.name} to ${uuApp.gitCheckoutDir}`);
        let output = execSync(`git clone ${configuration.git.uri}/${uuApp.gitName}.git ${uuApp.gitCheckoutDir}`);
        CONSOLE_LOG.debug(`Cloning result: ${output}`);
    }
}

/**
 * Resets changes in project.
 *
 * @param uuApp single project configuration
 */
const resetChanges = (uuApp) => {
    CONSOLE_LOG.verbose(`Resetting changes - ${uuApp.gitName} ( ${uuApp.gitCheckoutDir}):`);
    let output = execSync(`git reset --hard`, _createEnv(uuApp.gitCheckoutDir));
    CONSOLE_LOG.debug(output.toString());
}

/**
 * Checkouts branch in project.
 *
 * @param uuApp single project configuration
 * @param configuration configuration
 */
const checkoutBranch = (uuApp, configuration) => {
    CONSOLE_LOG.verbose(`Checking out ${configuration.git.branch} - ${uuApp.gitName} (${uuApp.gitCheckoutDir})`);
    let output = execSync(`git checkout ${configuration.git.branch}`, _createEnv(uuApp.gitCheckoutDir));
    CONSOLE_LOG.debug(output.toString());
}

/**
 * Pulls with rebase current branch in project.
 *
 * @param uuApp single project configuration
 */
const pullWithRebase = (uuApp) => {
    CONSOLE_LOG.verbose(`Pulling with rebase - ${uuApp.gitName} (${uuApp.gitCheckoutDir}):`);
    let output = execSync(`git pull --rebase`, _createEnv(uuApp.gitCheckoutDir));
    CONSOLE_LOG.debug(output.toString());
}

/**
 * Fetches changes in project from remote repository.
 *
 * @param uuApp single project configuration
 */
const fetch = (uuApp) => {
    CONSOLE_LOG.verbose(`Fetching changes from remote - ${uuApp.gitName} (${uuApp.gitCheckoutDir}):`);
    let output = execSync(`git fetch`, _createEnv(uuApp.gitCheckoutDir));
    CONSOLE_LOG.debug(output.toString());
}

const prepareWorkspace = (uuApp, configuration) => {
    clone(uuApp, configuration);
    resetChanges(uuApp);
    fetch(uuApp);
    checkoutBranch(uuApp, configuration);
    pullWithRebase(uuApp);
}

module.exports = {
    resetChanges,
    clone,
    checkoutBranch,
    pullWithRebase,
    fetch,
    prepareWorkspace
};