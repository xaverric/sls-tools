"use strict";

const crypto = require("crypto");

function _createKey(password) {
  return crypto.createHmac("sha256", password).digest();
}

function decrypt(text, password) {
  let textParts = text.split(":");
  let iv = Buffer.from(textParts.shift(), "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv("aes-256-ctr", _createKey(password), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

module.exports = { decrypt };
