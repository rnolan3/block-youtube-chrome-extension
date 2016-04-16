'use strict';

const INTERVAL_DELAY = 1000

let doneCallback = () => {}
let eachCallback = () => {}

let interval
let timeLeft = 0

let _return = {}

function _countDown () {
  let nextTime = timeLeft - 1

  eachCallback(nextTime)

  if (nextTime === 0) {
    doneCallback()
    pause()
  }

  timeLeft = nextTime
}

function each (c) {
  eachCallback = c
  return _return
}

function done (c) {
  doneCallback = c
  return _return
}

function pause () {
  clearInterval(interval)
  return _return
}

function play () {
  clearInterval(interval)
  interval = setInterval(_countDown, INTERVAL_DELAY)
  _countDown() // Start countdown immediately
  return _return
}

function setTime (newTime) {
  timeLeft = parseInt(newTime)
  return _return
}

function getTime () {
  return timeLeft
}

module.exports = _return = {
  done,
  each,
  pause,
  play,
  setTime,
  getTime
}
