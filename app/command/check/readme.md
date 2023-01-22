# check
Command allowing the user to perform checks on predefined set of URLs against the application. Every output from the URL call is validated against expected output and the validation status can be reported directly to the console or bookkit page.

## Usage
```shell
sls-tools check <parameters>
```

## Parameters

### --consoleOutput 

If text value is defined, checks will be logged into the console as a regular text. If table option is used, table form will be used to log into the console. If the attribute is not defined at all, no output will be shown in the console.

#### Supported types of consoleOutput
* ``text`` - logs as a regular text into the console
* ``table`` - logs the output in the table form into the console

### --checkGroup
Run checks for selected group names only.

### --problemReport
Show only checks which did not pass the validation.

### -v, --visualize
Flag defining whether all checks should be visualized in the predefined bookkit page.

## Configuration
This configuration snippet below describes only the changes to the base configuration documented [here](../../../readme.md).
```js
module.exports = {
    bookkit: {
        "checkReportPageCode": "...", // code of the page in the bookkit, where the check report should be stored
        "checkReportSectionCode": "..." // code of the section in page in the bookkit, where the check report should be stored
    },
    checks: [
        {
            "checkGroup": "customGroupName", // custom group name for checks, when used, checks will be grouped within later processing to logical blocks with the same group name
            "uuApp": "uuAppName1", // uuApp name defined in the uuApp.subAppList, used for building the whole URI and also for the authorization token information
            "command": "user/list", // command which should be called
            "method": "post", // HTTP method
            "dtoIn": {
                // HTTP Request Body
            },
            "description": "description for the check item", // displayed in the bookkit visualization
            "condition": {
                "type": "equal|function",
                "expextedDtoOut": Object, // mandatory for equal type, tool will do the deepEqual comparison with the provided dtoOut, optional for function type condition
                "function": (dtoOut) => { // mandatory for function type, custom validation function
                    // validate dtoOut in custom way
                    // return validation object
                    return {
                        validationStatus: true, 
                        errorMessage: "message"
                    }
                } 
            }
        }
        
    ]
}
```