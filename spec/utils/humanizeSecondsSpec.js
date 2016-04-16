'use strict';

const humanizeSeconds = require('../../src/utils/humanizeSeconds')

describe('Humanize Seconds', () => {
  it('formats seconds into M:SS.', () => {
    expect(humanizeSeconds(7)).toBe('0:07')
    expect(humanizeSeconds(60)).toBe('1:00')
    expect(humanizeSeconds(65)).toBe('1:05')
    expect(humanizeSeconds(645)).toBe('10:45')
  })
})
