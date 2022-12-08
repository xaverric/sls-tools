const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const {resolveUuAppAuthorization} = require("./helper/authorization-helper");

const CONFIG_DEFAULT_PATH = path.join(os.homedir(), '.data-exporter', 'config.js');

const readConfiguration = async cmdArgs => {
    let configuration;

    if (cmdArgs.config) {
        configuration = await loadFile(path.resolve(cmdArgs.config));
    } else {
        configuration = await loadFile(CONFIG_DEFAULT_PATH);
    }
    // TODO Example - authorize all uuApp.oidc users and store idToken to the configuration object for each user individually
    configuration = resolveUuAppAuthorization(configuration);

    // TODO - resolve temp directory - create if does not exist - extend temp directory by one additional directory with random hash name or timestamp to have every execution of the export uniquely stored on the filesystem
    // TODO - bind tempDirectory name to each exportitem, do not merge it with the filename yet
    // TODO - for each uuApp.subAppList item resolve the new attribure "baseUri" => uuApp.host + subAppListItem.context + subAppListItem.workspace
    // TODO - for each uuApp.subAppList item resolve the aturhoization token => fill authorization token from uuApp.oidc[auth]
    // TODO - for each exports item resolve baseUri from uuApp.subAppList and replace command value with uuApp.subAppListItem + exportsItem.command

    return configuration;
};

const loadFile = async path => {
    let file = require(path);
    if (typeof file === "function") {
        let loadedFile = await file();
        return loadedFile;
    }
    return file;
}

module.exports = {
    readConfiguration
}