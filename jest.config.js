module.exports = {
  preset: 'react-native',
  // preset: '@testing-library/react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js',
  ],
  setupFiles: [
    // './node_modules/react-native-gesture-handler/jestSetup.js',
    './__mocks__/firebase-auth.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
  ],
};
