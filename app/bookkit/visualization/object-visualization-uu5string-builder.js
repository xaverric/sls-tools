const template = require("./template/object-template");

const createUu5String = (exportItem, data) => {
    return template(
        data,
        exportItem
    );
}

module.exports = createUu5String;