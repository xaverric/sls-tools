# credentials-manager

Command allowing the user to register user account in the UAF application.

## Usage

```shell
sls-tools credentials-manager <parameters>
```

## Parameters

### --userData

File path to dtoIn file with all needed user information needed for registration

### dtoIn command line parameters (can be used instead the --userData path)

```
--uuIdentity string          uuIdentity value
--email string               email value
--firstName string           First name value
--lastName string            Last name value
--party string               Party value
--type string                Type value
--groups string[]            Groups value
--accessCode1 string         Access Code 1 value
--accessCode2 string         Access Code 2 value
```


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