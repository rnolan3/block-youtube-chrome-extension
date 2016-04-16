'use strict';
let video

let onPauseCallback = () => {}
let onPlayCallback = () => {}

exports.init = function () {
  video = document.getElementsByTagName('video')[0]

  if (video) {
    video.addEventListener('pause', function() {
      onPauseCallback()
    })

    video.addEventListener('play', function() {
      onPlayCallback()
    })
  }
}

/**
 * Dispatchers
 */

exports.onPause = function (callback) {
  onPauseCallback = callback
}

exports.onPlay = function (callback) {
  onPlayCallback = callback
}


/**
 * Listeners
 */

exports.play = function () {
  video.play()
}

exports.pause = function () {
  video.pause()
}
