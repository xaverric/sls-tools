const SecureStoreCliCommon = require("./app/secure-store-cli-common");

const initSecureStore = async () => {
  await SecureStoreCliCommon.init();
}

const readSecureStore = async (uuIdentity = null) => {
  if (!SecureStoreCliCommon.isInitialized()) {
    await SecureStoreCliCommon.init();
  }
  let secureStoreContent = await SecureStoreCliCommon.readSecureStore();
  if (uuIdentity) {
    return secureStoreContent[uuIdentity];
  }
  return secureStoreContent;
};

// execution
module.exports = {
  initSecureStore,
  readSecureStore
};
