'use strict';

const video = require('../src/video')
const mockVideoElem = require('./support/mockVideoElem')

describe('Video module', () => {
  let videoSpy
  let getElementsByTagNameSpy

  beforeEach(() => {
    getElementsByTagNameSpy = global.document.getElementsByTagName

    videoSpy = mockVideoElem()
  })

  function beforeSome () {
    getElementsByTagNameSpy.and.returnValue([ videoSpy ])
    video.init()
  }

  afterEach(() => {
    getElementsByTagNameSpy.calls.reset()
    videoSpy.addEventListener.calls.reset()
  })

  it('should not initialize if no video is present.', () => {
    getElementsByTagNameSpy.and.returnValue([])
    video.init()

    expect(getElementsByTagNameSpy).toHaveBeenCalled()
    expect(getElementsByTagNameSpy.calls.argsFor(0)).toEqual(['video'])
    expect(videoSpy.addEventListener).not.toHaveBeenCalled()
  })

  it('should initialize if video is present.', () => {
    beforeSome()
    expect(getElementsByTagNameSpy).toHaveBeenCalled()
    expect(videoSpy.addEventListener).toHaveBeenCalledWith('pause', jasmine.any(Function))
    expect(videoSpy.addEventListener).toHaveBeenCalledWith('play', jasmine.any(Function))
  })

  it('should execute pause callback when pause event is fired', () => {
    let pauseCallback = jasmine.createSpy('pauseCallback')

    beforeSome()
    video.onPause(pauseCallback)
    video.pause()

    expect(videoSpy.pause).toHaveBeenCalled()
  })

  it('should execute play callback when play event is fired', () => {
    let playCallback = jasmine.createSpy('playCallback')

    beforeSome()
    video.onPlay(playCallback)
    video.play()

    expect(videoSpy.play).toHaveBeenCalled()
  })
})
