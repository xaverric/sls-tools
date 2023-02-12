const template = require("./template/full-export-section-template");

const createUu5String = (code, name) => {
    return template(code, name);
}

module.exports = createUu5String;