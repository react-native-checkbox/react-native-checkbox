'use strict';

const path = require('path');

const windowsSwitch = '--use-react-native-windows';

if (process.argv.includes(windowsSwitch)) {
  // Remove the flag from args so CLI doesn't break
  process.argv = process.argv.filter((arg) => arg !== windowsSwitch);
  // Tell Metro to use Windows-specific config
  process.argv.push('--config=metro.config.windows.js');
}

module.exports = {
  // Dependencies configuration - point to the src folder
  dependencies: {
    '@react-native-community/checkbox': {
      root: path.resolve(__dirname, '../src'),
    },
  },
};
