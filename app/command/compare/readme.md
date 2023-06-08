# compare
Command allowing the user to perform checks on predefined set of URLs against the application. Every output from the URL call is validated against expected output and the validation status can be reported directly to the console or bookkit page.

## Usage
```shell
sls-tools compare <parameters>
```

## Parameters

### --left

Path to the zip file containing the export for comparison.

### --right

Path to the zip file containing the export for comparison.



### --bookkitCompare
Flag defining whether the tool should download two latest exports from bookkit and use them for comparison. If this option is used, it overrides the --left and --right argument.

### --diffOnly
Flag defining whether the output should be filtered to contain the differences only.

### --outputType
Define the comparison output type. HTML is default value.

#### Supported types of output
* ``HTML`` - produces a HTML output into the tempDir folder defined in the configuration.

### --emailNotification
Flag defining whether the output from checks should be sent via email.

## Configuration
This configuration snippet below describes only the changes to the base configuration documented [here](../../../readme.md).
```js
module.exports = {
    compare: {
        ignoredZipEntries: [
            "zipPathEntryName" // can be only a part of the entry name, not whole path
        ]
    }
}
```