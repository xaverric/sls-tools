const template = require("./template/full-export-section-template");

const createUu5String = (code) => {
    return template(code);
}

module.exports = createUu5String;