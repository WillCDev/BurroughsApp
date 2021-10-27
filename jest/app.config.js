const config = {
  ...require('./base.config'),
  moduleDirectories: ['node_modules', '<rooDir>/app/src'],
  testMatch: ['<rootDir>/app/**/*.test.[tj]s?(x)'],
  coverageDirectory: 'app/coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest/app-setup.js'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    'core/(.*)': ['<rootDir>/app/src/core/$1'],
  },
}
config.globals['ts-jest'].tsconfig = '<rootDir>/app/tsconfig.json'

module.exports = config
