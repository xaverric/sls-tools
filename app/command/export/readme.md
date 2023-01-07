# export
Command allowing the user to export predefined set of URLs against the application, store the result into the filesystem and eventually zip all exports into the single zip file and upload it to the bookkit page. Particular REST API call outputs can be also visualized in the bookkit page.

## Usage
```shell
sls-tools export <parameters>
```

## Parameters

### --exportType string[]

Defines the expected export type, which is expected to be performed.

#### Supported types of export
* ``cmd`` - performs export by calling REST API service
* ``k8s`` - performs export via kubectl

#### Supported types for outputs
* ``text`` - any text value returned by the REST service, i.e. ```JSON```
* ``binary`` - any binary data returned by the REST service, i.e. ```ZIP``` file

### --fullExport            
Flag defining whether all exported files should be published as a single zip
file.

### -u, --upload            
Flag defining whether full export data should be uploaded to predefined bookkit page.

### -v, --visualize         
Flag defining whether all exported files should be visualized in bookkit. 

#### Supported types of visualizations
* ``list`` - visualization type applicable for list outputs. In that case, table with predefined columns is generated within the bookkit page.
* ``object`` - visualization type applicable for single object outputs. In that case, whole object will be displayed in the bookkit page. 

## Configuration
This configuration snippet below describes only the changes to the base configuration documented [here](../../../readme.md).
```js
module.exports = {
    bookkit: {
        "fullExport": "..." // code of the page in the bookkit, where the full export should be stored
    },
    exports: [
        // cmd export type
        {
            "exportType": "cmd",
            "uuApp": "uuAppName1", // uuApp name defined in the uuApp.subAppList, used for building the whole URI and also for the authorization token information
            "command": "user/list", // command which should be called
            "method": "post", // HTTP method
            "dtoIn": {
                // HTTP Request Body
            },
            "name": "output-file-name.json", // filename of the file where the command call output will be stored
            "type": "text", // expected output format (binary or text)
            "itemListName": "customListName", // dtoOut list name (might be needed for visualization, if not defined "itemList" name is used as default
            "outDirectory": "dirname", // output directory - tempdir + exportType + outDirectory
            "visualize": { // optional, in case it is defined, it is used for visualization of the response into the bookkit page
                "type": "list|object", // list or object visualization type
                "page": "daProductionConfigurationAdjustmentValues", // bookkit page code
                "code": "eb190f7480d0cdce28acf78a1c73bf0c", // bookkit page section 
                "header": "Adjustment Values", // bookkit page section header to be displayed
                "attributes": [ 
                    // applicable for "list" visualization type only
                    // list of object attribute keys, every object will be displayed as a new line in the table, avery attribute defined here represents the column in the table
                ]
            }
        },
        // k8s export type
        {
            "exportType": "k8s",
            "name": "output-file-name.yaml", // filename of the file where the command call output will be stored
            "uuApp": "uuApp name" // uuApp name defined in the uuApp.subAppList
        }
    ]
}
```