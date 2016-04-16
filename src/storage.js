'use strict';

let storageKey = 'key'
let defaultTime = 0

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
