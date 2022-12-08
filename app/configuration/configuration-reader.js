const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const {resolveUuAppAuthorization} = require("./helper/authorization-helper");
const {createNewDir, bindToExportItem} = require("./helper/directoryPath-helper");
const {createBaseUri, baseUriMergeCmd} = require("./helper/uri-helper");

const CONFIG_DEFAULT_PATH = path.join(os.homedir(), '.data-exporter', 'config.js');

const readConfiguration = async cmdArgs => {
    let configuration;

    if (cmdArgs.config) {
        configuration = await loadFile(path.resolve(cmdArgs.config));
    } else {
        configuration = await loadFile(CONFIG_DEFAULT_PATH);
    }

    // TODO Example - authorize all uuApp.oidc users and store idToken to the configuration object for each user individually
    configuration = await resolveUuAppAuthorization(configuration);

    // TODO - resolve temp directory - create if does not exist - extend temp directory by one additional directory with random hash name or timestamp to have every execution of the export uniquely stored on the filesystem

    configuration = await createNewDir(configuration)

    // TODO - bind tempDirectory name to each export item, do not merge it with the filename yet
    configuration = await bindToExportItem(configuration)

    // TODO - for each uuApp.subAppList item resolve the new attribure "baseUri" => uuApp.host + subAppListItem.context + subAppListItem.workspace
    configuration = await createBaseUri(configuration)

    // TODO - for each uuApp.subAppList item resolve the authorization token => fill authorization token from uuApp.oidc[auth]
    configuration = await pairTokenCmd(configuration)

    // TODO - for each exports item resolve baseUri from uuApp.subAppList and replace command value with uuApp.subAppListItem + exportsItem.command
    configuration = await baseUriMergeCmd(configuration)


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
const pairTokenCmd = async (configuration) => {
    let tokens = new Map();
    for (const oidcIdentityName of Object.keys(configuration.uuApp.oidc)) {
        tokens.set(oidcIdentityName, oidcIdentityName.token)
    }
    for (const subApp of configuration.uuApp.subAppList) {
        if (tokens.has(subApp.auth)) {
            subApp.token = tokens.has(subApp.auth)
        }
    }

}

module.exports = {
    readConfiguration
}