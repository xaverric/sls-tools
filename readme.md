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
* [check](app/command/check/readme.md)
* [dependency-manager](app/command/dependency-manager/readme.md)

## Parameters

### --command string

export, help commands. All these can be used as default commands without providing --command argument.

### -c, --config string

Base configuration folder path containing *env.json* files with *contexts.json* for each environment.

### -e, --environment string

Specify the environment name for which the action should be performed. If not specified, all available environments are executed.

### --noprompt boolean

Disable prompt feature.

## Configuration

Configuration is defined in the ```*.js``` file and can be structured to any need. Main ```*.js``` file must export a
configuration object. The structure of the object and mandatory fields is described below.

### config.js

```js
module.exports = [
    {
        tempDir: "...", // local folder path for temorary data storage
        git: {
            uri: "...", // git base URI (final uri is concatenated from git.uri + uuApp.gitName
            branch: "...", // active branch name
            tempDir: "..." // temp dir for git clone command, if not defined, default tempDir value is used instead git.tempDir
        },
        uuApp: {
            name: "...", // name of the uuApp
            shortName: "...", //short name value identificator, used for environment filtering
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
        email: { // global email integration configuration, used by tool for notification purposes, email notification needs to be usually turned on by command line argument, i.e. --emailNotification
            "transportsConfiguration": {
                "auth": {
                    "pass": "password",
                    "user": "username"
                },
                "host": "email server address",
                "port": 465,
                "secure": true
            },
            "recipients": [
                "recepient list email addresses"
            ]
        },
        exports: [
            // array of exports, see more details in the export command documentation
        ],
        checks: [
            // array of checks, see more details in the check command documentation
        ]
    }
]
```

## Logs

logs are automatically stored to the ```%HOME%/.sls-tools/logs``` folder

## Changelog

### 1.5.0-RC1
Optimized error handling

### 1.5.0-RC
First iteration which is not covering whole implementation set, specifically lock feature.

* Added [dependency-manager](app/command/dependency-manager/readme.md) feature allowing user to analyze or lock dependencies. Analysis can be also visualized into the CSV or bookkit page.
* Added git support to clone, fetch, pull, checkout specific GIT repository and branch for any uuApp based on the configuration definition.
* Optimized configuration loader module to not load unnecessary configuration for the executed command

### 1.4.1
* prompt feature added for asking user before execution interactively in the command line whether it is allowed to proceed
    * default behavior can be by-passed by the specifying the ```--noprompt``` parameter
* option to visualize k8s export type - config map is converted from yaml into JSON format
* config map is always stored to both ```yaml``` and ```json``` format

### 1.4.0
* environment support added
  * to define multiple environments, simply export an array of invividual configuration objects with its own ```uuApp```, ```exports```, ```checks```, etc... definitions
  * single environmnet via single object export is still supported
  
### 1.3.0

* [check](app/command/check/readme.md) command visualization output extended to provide a dashboard overview of all successful and unsuccessful
  checks
* added *description* attribute support for every individual check

### 1.2.0

* [check](app/command/check/readme.md) command support for URL output verification
* email notifications for check command

### 1.1.0

* improved command line interface to be more structured, i.e. ```sls-tools export``` command will display help related
  to the export command only.
* visualization export improvement - added support to visualize objects

## TODO
- call
    - same as export but only calls the URLs, does not store anything
    - support to load the dtoIn list file and execute the dtoIns against same command (replacement for uuCommander)
    - modes
        - ```calls``` array with same definition as check item
            - for every dtoIn uuApp is specified individually, same as group, etc
        - dtoIn list file path
            - support to load file
            - define command to call, uuApp, + method
        - define exact URL to call plus dtoIn
- compare
    - suitable for fullExport comparison
- authorization
    - support oidc-plus4u-vault
    - store token for every uuApp individually into file system and reuse it if possible