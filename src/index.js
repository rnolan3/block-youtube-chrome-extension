'use strict';

const counter = require('./counter')
const storage = require('./storage')
const timerElem = require('./timerElem')
const video = require('./video')

const TODAY = new Date()
const DEFAULT_TIME_LEFT = 3600; // In seconds
const STORAGE_KEY = `timeLeft.${TODAY.getYear()}-${TODAY.getMonth()}-${TODAY.getDate()}`

function initTimer (time) {
  timerElem.label(time)

  counter
    .setTime(time)
    .each((tl) => {
      storage.saveTime(tl)
      timerElem.label(tl)
    })
    .done(() => {
      video.pause()
      timerElem.done()
    })
}

function initVideoPage() {
  var location = window.location.pathname + '';

  if (/watch/.test(location)) {
    video.init()
    video.onPause(counter.pause)
    video.onPlay(counter.play)

    counter.play()
  } else {
    counter.pause()
  }
}

/**
 * Let's get this party started
 */

storage.init(STORAGE_KEY, DEFAULT_TIME_LEFT)
storage.getTime().then(initTimer)

initVideoPage();

/**
 * Page page listener
 */
(document.body || document.documentElement)
  .addEventListener('transitionend', event => {
    if (event.propertyName === 'width' && event.target.id === 'progress') {
      initVideoPage()
    }
  }, true);
