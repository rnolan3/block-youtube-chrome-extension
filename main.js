/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const counter = __webpack_require__(1)
	const storage = __webpack_require__(2)
	const timerElem = __webpack_require__(3)
	const video = __webpack_require__(5)

	const TODAY = new Date()
	const DEFAULT_TIME_LEFT = 3600; // In seconds
	const STORAGE_KEY = `timeLeft.${TODAY.getYear()}-${TODAY.getMonth()}-${TODAY.getDate()}`

	function initTimer (time) {
	  timerElem.label(time)
	  storage.subscribe((tl) => timerElem.label(tl))

	  counter
	    .setTime(time)
	    .each((tl) => storage.saveTime(tl))
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


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	let storageKey = 'key'
	let defaultTime = 0
	let subscribers = []


	chrome.storage.onChanged.addListener((e) => {
	  let { newValue, oldValue } = e[storageKey]

	  if (newValue !== oldValue) {
	    subscribers.forEach((c) => c(newValue))
	  }
	})

	exports.init = function (k, t) {
	  storageKey = k
	  defaultTime = t

	  return { storageKey, defaultTime }
	}

	exports.getTime = function () {
	  return new Promise((resolve, reject) => {
	    try {
	      chrome.storage.local.get(storageKey, (result) => {
	        const value = result[storageKey];
	        resolve(typeof value !== 'undefined' ? value : defaultTime)
	      })
	    } catch (e) {
	      reject('There was a problem fetching from chrome storage.')
	    }
	  })
	}

	exports.saveTime = function (t) {
	  return new Promise((resolve, reject) => {
	    let storageObj = {}
	    storageObj[storageKey] = t

	    try {
	      chrome.storage.local.set(storageObj, (result) => {
	        resolve(result)
	      })
	    } catch (e) {
	      reject('There was a problem saving to chrome storage.')
	    }
	  })
	}

	exports.subscribe = function (callback) {
	  subscribers.push(callback)
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const humanizeSeconds = __webpack_require__(4)

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function humanizeSeconds (totalSeconds) {
	  let minutes = Math.floor(totalSeconds / 60)
	  let seconds = totalSeconds - (minutes * 60);
	  return minutes + ':' + (seconds > 9 ? seconds : '0' + seconds);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);