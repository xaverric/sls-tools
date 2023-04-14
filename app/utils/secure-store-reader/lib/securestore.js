const path = require("path");
const fs = require("fs");
const homedir = require("os").homedir();
const mycrypto = require("./mycrypto");

const DEFAULT_LOCATION = path.join(homedir, ".oidc-plus4u-vault", "vault.data");

function read(password, file = DEFAULT_LOCATION) {
  let encrypted = fs.readFileSync(file);
  return _readFromBytes(password, encrypted);
}

function _readFromBytes(password, bytes) {
  let decrypted = mycrypto.decrypt(bytes.toString(), password);
  return JSON.parse(decrypted);
}

module.exports = { read };
