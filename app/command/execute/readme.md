# execute

Ultimate JS code executor allowing the user to execute any JS code which is part of the configuration. Can be used for custom script execution via the tool.

Execution scripts can be separated into the groups and in each individual group, any following execution script can work with the output provided from the previous script executed in the same chain. Due to that, the order of the scripts matter in the configuration definition.

## Usage

```shell
sls-tools execute <parameters>
```

## Parameters

### --group

Run execute command for selected groups only.

### --params
Parameters support to be able to parametrize the execution datasets. It is not allowed to have an empty string in the text parameter value. The space serves as a delimiter of all the provided parameters. Quoting the parameter value does not work.
Within the dataset, the parameters are available in ``configuration`` object under the ``executeParams`` attribute.

*Parameter Convention Definition*
```bash
# Definition 
key=value

# Example
sls-tools execute --config [path] -e [env] --params parameter1=textvalue parameter2=2
```

*Usage in Execution Dataset*
```js
module.exports = async (slsToolsApi, options) => {
    // Initialization section
    const executeParams = options.configuration.executeParams;
    // Script logic
    // Return response
}
```

## Configuration

This configuration snippet below describes only the changes to the base configuration
documented [here](../../../readme.md).

```js
module.exports = {
    execute: [
        // Execution scripts can be separated into individual groups. 
        // Order of the scripts in the groups matter, every script can read and use the dtoOut returned from the previous script in given group
        {
            group: "group name",
            name: "script name",
            // uuApps to be used in the script, the tool will resolve the authorization token and AWID/ASID for every uuApp.
            uuAppList: [],
            /**
             * Custom script defined as a function
             * 
             * @param slsToolsApi
             * @param cmdArgs
             * @param configuration
             * @param uuAppList
             * @param lastDtoOut
             * @returns {Promise<{dtoOut: {}, message: string, status: string}>}
             */
            script: async (slsToolsApi, {cmdArgs, configuration, uuAppList, lastDtoOut = null}) => {
                const {call, generateToCSV, CONSOLE_LOG, XMLParser} = slsToolsApi;
                // custom logic of the script
                return {
                    status: "OK | NOK",
                    message: "",
                    dtoOut: {}
                }
            }
        },
        {
            group: "group name",
            uuAppList: [],
            script: async (slsToolsApi, options) => {
                // custom logig of the script interacting with the response from previous script
                console.log(options.lastDtoOut);
                return {
                    status: "OK",
                    message: "",
                    dtoOut: {}
                }
            }
        }
    ]
}
```

### slsToolsApi

Object containing helper methods and objects, which can be used in the called script

#### Client
```js
/**
 * sls-tools Client API to be used in the custom scripts execution
 *
 * @param uuApp - uuApp object name from the configuration, by the uuApp name, the sls-tools automatically resolved the authorization token
 * @param command - command to be called over the uuApp, i.e. user/list
 * @param dtoIn - command dtoIn object
 */
static post = async (uuApp, command, dtoIn) => {}
static get = async (uuApp, command, dtoIn) => {}
```

#### generateToCSV
```js
/**
 * Transforms provided array of objects into the CSV content type
 *
 * @param array - array of objects containing data (keys) to transformation into the CSV content type
 * @param fields - array objects field names transformed into the CSV columns
 * @param unwindObject - object containing unwind configuration
 * @param flattenObject - object containing flatten configuration
 @returns {} - CSV text content
 */
const generateToCSV = (array, fields, unwindObject = {paths: [], blankOut: false}, flattenObject = { objects: false, arrays: false }) => {}
```

#### CONSOLE_LOG
Standard console logger declared within the winston library. Output is logged into the console and file to the ``%HOME%/.sls-tools/logs`` location. Scripts needs to use this provided console logger, otherwise, when console.log is used directly, the output would got lost.

#### XMLParser
XMLParser object available from ``fast-xml-parser`` library which can be used in the script for any work with the XML content.

#### csvtojson
csvtojson object available from ``csvtojson`` library.

#### AdmZip
AdmZip object from the ``adm-zip`` library.

#### Handlebars
Handlebars object from the ```handlebars.js``` library