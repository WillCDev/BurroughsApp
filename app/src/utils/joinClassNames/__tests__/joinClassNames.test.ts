import joinClassNames from '../joinClassNames'

describe('Utils: joinClassNames', () => {
  it('should return a concatenated list of classNames and omit falsy values', () => {
    const classnames = joinClassNames([
      '',
      'a',
      '  ',
      ' b ',
      'c d',
      '',
      null,
      undefined,
    ])

    expect(classnames).toBe('a b c d')
  })
})
