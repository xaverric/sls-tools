# credentials-manager

Command allowing the user to register user account in the UAF application.

## Usage

```shell
sls-tools credentials-manager <parameters>
```

## Parameters

### --userData

File path to dtoIn file with all needed user information needed for registration

## Configuration

This configuration snippet below describes only the changes to the base configuration
documented [here](../../../readme.md).

```js
module.exports = {
    "credentials-manager": [
        {
            priority: 1,
            uuApp: "...",
            command: "createUser",
            method: "post"
        },
        {
            priority: 2,
            uuApp: "...",
            command: "setAccessCodes",
            dtoIn: {},
            method: "post"
        }
    ]
}
```