module.exports = {
  rootDir: process.cwd(),
  preset: 'ts-jest',
  clearMocks: true,

  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
      tsconfig: 'tsconfig.json',
    },
  },
  globalSetup: '<rootDir>/jest/global-setup.js',
  transform: {
    '.+\\.(j|t)sx?$': 'ts-jest',
  },

  coverageDirectory: 'coverage',
  collectCoverage: true,

  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
}
