'use strict';
const humanizeSeconds = require('./utils/humanizeSeconds')

let widget = document.createElement('div')
let label = document.createElement('span')

/**
 * Initialize
 */

label.classList.add('youtube-blocker-label')
label.innerText = '....'

widget.classList.add('youtube-blocker-widget')
widget.appendChild(label)

document.body.appendChild(widget)

/**
 * Public methods
 */

exports.label = function (time) {
  label.innerText = humanizeSeconds(time)
}

exports.done = function () {
  widget.classList.add('youtube-blocker-widget-done')
}

exports.getDOMNode = function (elem) {
  switch (elem) {
    case 'widget':
      return widget

    case 'label':
      return label
  }
}
