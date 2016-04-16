'use strict';

const counter = require('../src/counter')

describe('Counter', () => {
  var mockCallbacks

  beforeEach(() => {
    mockCallbacks = {
      each: function () {},
      done: function () {}
    }

    spyOn(mockCallbacks, 'each')
    spyOn(mockCallbacks, 'done')
  })

  it('can set a time from which to count down from.', () => {
    counter.setTime(200)
    expect(counter.getTime()).toBe(200)
  })

  it('should pause the remaining time.', (done) => {
    counter.setTime(3).play()
    setTimeout(() => {
      counter.pause()
      expect(counter.getTime()).toBe(2)
      done()
    }, 990)
  })

  it('should execute the each callback every cycle.', (done) => {
    counter.setTime(2).each(mockCallbacks.each).play()
    setTimeout(() => {
      expect(mockCallbacks.each).toHaveBeenCalled()
      expect(mockCallbacks.each).toHaveBeenCalledTimes(2)
      done()
    }, 3001);
  })

  it('should exectue the done callback once time is up.', (done) => {
    counter.setTime(1).done(mockCallbacks.done).play()
    setTimeout(() => {
      expect(mockCallbacks.done).toHaveBeenCalled()
      expect(mockCallbacks.done).toHaveBeenCalledTimes(1)
      done()
    }, 2001);
  })
})
