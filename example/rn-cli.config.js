const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const reactNativeCheckboxRoot = path.resolve(__dirname, '..');

module.exports = {
  projectRoot: __dirname,
  watchFolders: [reactNativeCheckboxRoot],
  resolver: {
    blacklistRE: blacklist([new RegExp(`${reactNativeCheckboxRoot}/node_modules/react-native/.*`)]),
  },
};