const escapeUu5StringArray = (array) => {
    return JSON.stringify(array).replaceAll('\"', '\\"');
}

const stringifyToEscapedUu5StringObject = (object) => {
    return JSON.stringify(object, null, 4).replaceAll('"', '\\\\\\"');
}

module.exports = {
    escapeUu5StringArray,
    stringifyToEscapedUu5StringObject
}