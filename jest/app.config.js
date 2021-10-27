const config = {
  ...require('./base.config'),
  moduleDirectories: ['node_modules'],
  testMatch: ['<rootDir>/app/**/*.test.ts'],
  coverageDirectory: 'app/coverage',
  testEnvironment: 'jsdom',
}
config.globals['ts-jest'].tsconfig = '<rootDir>/app/tsconfig.json'

module.exports = config
