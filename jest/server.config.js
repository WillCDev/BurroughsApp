const config = {
  ...require('./base.config'),
  moduleDirectories: ['node_modules'],
  testMatch: ['<rootDir>/server/**/*.test.ts'],
  coverageDirectory: 'server/coverage',
  testEnvironment: 'node',
}
config.globals['ts-jest'].tsconfig = '<rootDir>/server/tsconfig.json'

module.exports = config
