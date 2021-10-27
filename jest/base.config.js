module.exports = {
  rootDir: process.cwd(),
  preset: 'ts-jest',
  clearMocks: true,

  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  globalSetup: '<rootDir>/jest/global-setup.js',
  transform: {
    '.+\\.(j|t)sx?$': 'ts-jest',
  },
  collectCoverage: true,
  moduleFileExtensions: ['ts', 'js', 'json', 'tsx'],
}
