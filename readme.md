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
* [credentials-manager](app/command/credentials-manager/readme.md)
* [compare](app/command/compare/readme.md)
* [execute](app/command/execute/readme.md)

## Parameters

### --command string

``export``, ``check``, ``dependency-manager``, ``credentials-manager``, ``compare``, ``execute`` commands. All these can be used as default commands without providing --command argument.

### -c, --config string

Base configuration folder path containing *env.json* files with *contexts.json* for each environment.

### -e, --environment string

Specify the environment name for which the action should be performed. If not specified, all available environments are executed.

### --noprompt boolean

Disable prompt feature.

### --noconfig boolean

Flag defining whether the config should be loaded. Default value is set to false. This option might get handy when it is required to provide all parameters via CLI only (i.e. when sls-tools is used as a project dependency)


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
                "userName1": { // example with direct definition of access codes
                    accessCode1: "...",
                    accessCode2: "..."
                },
                "userName2": { // example with loading the credentials from the vault - user will be prompted shortly after the execution to insert the master password to the secure store, all other credentials will be loaded from it automatically based on the uid defined
                    uid: "10-10-1-1",
                    strategy: "vault"
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
            // you can either define the vault strategy with user uid
            uid: "10-10-1-1",
            strategy: "vault",
            // or you can defined the access codes directly
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
        ],
        compare: {
            // confuguration object for comparison task, see more details in the compare command documentation
        },
        "credentials-manager": [
            // array of registration commands, see more details in the credentials-manager command documentation
        ]
    }
]
```

## Logs

logs are automatically stored to the ```%HOME%/.sls-tools/logs``` folder

## Changelog

### 1.8.0
* Extend export command to be able to visualize data right into the CSV apart from the bookkit visualization. If not specified, the bookkit visualization is used by default.
* Added support to filter export commands by their IDs.
* Code refactor related to the export visualization.

### 1.7.1 - 1.7.5 
* Credentials manager improvements and fixed. User data can not be provided right from the command line interface without the need of temporary JSON file.

### 1.7.0
* Added support for easy user registration via command line interface. 

### 1.6.0
* Added support for [compare](app/command/compare/readme.md) feature. Tool can now compare two exports and produce the comparison output. Exports for comparison can be provided directly fro mthe file system, or it can automatically download the two latest comparisons for given environment from the bookkit. Comparison report can be filtered to contain differences only and also can send an email notification about the changes in the configuration. 

### 1.5.1 
* Secure store generated using [oidc-plus4u-vault](https://www.npmjs.com/package/oidc-plus4u-vault) supported. Access codes to any user identities does not have to be defined right in the configuration but can be loaded from the protected secure store.
* It is only supported the load of secure store from default location which is **$HOME/.oidc-plus4u-vault/vault.data**

### 1.5.0-RC3 - 1.5.0-RC5
* Added support for tool execution without configuration using ```--noconfig``` parameter. This option is mainly supported for the [dependency-manager](app/command/dependency-manager/readme.md) task - mandatory parameters must be however provided via CLI (i.e. path to the package.json/package-lock.json)
* Added [dependency-manager](app/command/dependency-manager/readme.md) lock feature.

### 1.5.0-RC1 & 1.5.0-RC2
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
- call - uucommander alternative