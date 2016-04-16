'use strict';

function domFixture () {
  return {
    classList: {
      add: jasmine.createSpy('classList.add')
    },
    innerText: null,
    appendChild: function () {}
  }
}

global.window = {
  location: {}
}

global.document = {
  createElement: function () { return domFixture() },
  getElementsByTagName: jasmine.createSpy('getElementsByTagName'),
  body: {
    addEventListener: function () { },
    appendChild: jasmine.createSpy('appendChild')
  }
}

const app = require('../src/index')

describe('App', () => {})
