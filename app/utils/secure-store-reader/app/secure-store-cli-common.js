const secureStore = require("../lib/securestore");
const { promptSecret } = require("../../prompt/prompt-module");

class SecureStoreCliCommon {
    static _password = "";

    static async init() {
        SecureStoreCliCommon._password = await promptSecret();
        secureStore.read(SecureStoreCliCommon._password);
    }

    static async readSecureStore() {
        return secureStore.read(SecureStoreCliCommon._password);
    }

    static isInitialized = () => {
        return SecureStoreCliCommon._password !== "";
    }
}

module.exports = SecureStoreCliCommon;
