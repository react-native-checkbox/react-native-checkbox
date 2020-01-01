module.exports = {
  preset: 'react-native',
  testPathIgnorePatterns: ['/node_modules/', 'dist'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
