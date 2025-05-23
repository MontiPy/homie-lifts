// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const defaultConfig = getDefaultConfig(__dirname);

// allow React Native–specific entrypoints in firebase/auth
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
