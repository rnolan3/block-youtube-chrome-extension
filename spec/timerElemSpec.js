'use strict';

const timerElem = require('../src/timerElem')

const SECONDS = 300
const SECONDS_HUMANIZED = '5:00'

describe('Timer Element', () => {
  let spyOnDOM
  let spyOnLabel
  let widget
  let label

  beforeEach(() => {
    widget = timerElem.getDOMNode('widget')
    label = timerElem.getDOMNode('label')

    spyOnDOM = jasmine.createSpyObj(global.document, ['createElement'])
  })

  afterEach(() => {
    widget.classList.add.calls.reset()
    label.classList.add.calls.reset()
  })

  it ('should initialize timer element.', () => {
    expect(widget.classList.add.calls.argsFor(0)).toEqual(['youtube-blocker-widget'])
    expect(label.classList.add.calls.argsFor(0)).toEqual(['youtube-blocker-label'])
  })

  it ('should update the inner text value.', () => {
    timerElem.label(SECONDS)
    expect(label.innerText).toBe(SECONDS_HUMANIZED)
  })

  it ('should change state when time is up.', () => {
    timerElem.done()
    expect(widget.classList.add).toHaveBeenCalled()
    expect(widget.classList.add.calls.argsFor(0)).toEqual(['youtube-blocker-widget-done'])
  })
})
