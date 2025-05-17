// jest.config.js
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx'],
    transformIgnorePatterns: ['/node_modules/'],
    setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js']
  };
  