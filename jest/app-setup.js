// eslint-disable-next-line
const { configure } = require('@testing-library/dom')
require('@testing-library/jest-dom')

configure({
  testIdAttribute: 'data-test-id',
})
