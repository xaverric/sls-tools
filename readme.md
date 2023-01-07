# sls-tools
Your daily helper tool you didn't know you needed 👀.

## Installation
```
npm install -g sls-tools
```

## Prerequisites
* NodeJs 18+
* kubectl
  * In case you want to use features related to k8s, you need to have properly installed and set up the kubectl tool.

## Usage
```
sls-tools <command> <command parameters>
```

## Commands
* help
* [export](app/command/export/readme.md)

## Parameters

### --command string
export, help commands. All these can be used as default commands without providing --command argument.

### -c, --config string
Base configuration folder path containing *env.json* files with *contexts.json* for each environment.

## Configuration
Configuration is defined in the ```*.js``` file and can be structured to any need. Main ```*.js``` file must export a configuration object. The structure of the object and mandatory fields is described below.

### config.js

```js
module.exports = {
    tempDir: "...", // local folder path for temorary data storage
    uuApp: {
        name: "...", // name of the uuApp
        host: "...", // host uri of the uuApp
        oidcHost: "...", // oidc host uri (grantToken) for obtaining the authorization token
        oidc: { // oidc credentials object
            "userName1": {
                accessCode1: "...",
                accessCode2: "..."
            },
            "userName2": {
                accessCode1: "...",
                accessCode2: "..."
            }
        },
        subAppList: [ // list of subApps for the given uuApp
            {
                name: "subAppName", // name of the subApp, used only in this tool as an identification value
                context: "subAppContext", // real context value in the URI when the uuApp should be called
                workspace: "subAppWorkspace", // workspace id (AWID/ASID)
                auth: "userName1" // user id (defined in the uuApp.oidc) which should be used for the authentication when using command call over this subApp with given name
            }
        ]
    },
    k8s: { // k8s configuration, the prerequisitiy is to have kubectl installed 
        "context": "...", // k8s context
        "namespace": "...", // k8s namespace
        "configNamePostfix": "-application-config" // used for exports to search for config maps including only this value in its name
    },
    bookkit: {
        "accessCode1": "...",
        "accessCode2": "...",
        "oidcHost": "...",
        "uri": "..."
    },
    exports: [ 
        // array of exports, see more details in the export command documentation
    ]
}
```

## Logs
logs are automatically stored to the ```%HOME%/.sls-tools/logs``` folder

## Changelog
### 1.1.0
* improved command line interface to be more structured, i.e. ```sls-tools export``` command will display help related to the export command only.
* visualization export improvement - added support to visualize objects
* 

## TODO
- export
  - visualize k8s type as object
- check
  - similar to export, but can check the gathered output with predefined output
  - can visualize OK status to the predefined bookkit page
- call
  - same as export but only calls the URLs, does not store anything
  - support to load the dtoIn list file and execute the dtoIns against same command (replacement for uuCommander)
- compare
  - suitable for fullExport comparison
- dependency-manager
  - checkout the GIT folders to specific path for every subApp in subAppList
  - produce dependency list for the project