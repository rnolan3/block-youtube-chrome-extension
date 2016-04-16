'use strict';

module.exports = function humanizeSeconds (totalSeconds) {
  let minutes = Math.floor(totalSeconds / 60)
  let seconds = totalSeconds - (minutes * 60);
  return minutes + ':' + (seconds > 9 ? seconds : '0' + seconds);
}
