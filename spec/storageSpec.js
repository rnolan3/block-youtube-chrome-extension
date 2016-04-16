'use strict';

const storage = require('../src/storage')

const DEFAULT_VALUE = 'DEFAULT_VALUE'
const STORAGE_KEY = 'STORAGE_KEY'

const TEST_DATA = 'TEST_DATA'
const TEST_DATA_ALT = 'TEST_DATA_ALT'

global.chrome = {
  storage: {
    local: {}
  }
}

function generateMockResult (key, value) {
  let obj = {}; obj[key] = value
  return obj
}

describe('Storage', () => {
  let spyOnStorage

  beforeEach(() => {
    spyOnStorage = chrome.storage.local = jasmine.createSpyObj(chrome.storage.local, ['get', 'set'])
    storage.init(STORAGE_KEY, DEFAULT_VALUE)
  })

  afterEach(() => {
    spyOnStorage.get.calls.reset()
    spyOnStorage.set.calls.reset()
  })

  it('should initialize with defined storage key and default time.', () => {
    let result = storage.init(STORAGE_KEY, DEFAULT_VALUE + 'append')

    expect(result.storageKey).toBe(STORAGE_KEY)
    expect(result.defaultTime).toBe(DEFAULT_VALUE + 'append')
  })

  it('should return the default time if local storage is `undefined`.', () => {
    spyOnStorage.get.and.callFake((key, callback) => {
      callback(generateMockResult(key, undefined))
    })

    storage.getTime().then((t) => {
      expect(spyOnStorage.get).toHaveBeenCalled()
      espect(t).toBe(DEFAULT_VALUE)
    })
  })

  it('should get stored data from local storage.', (done) => {
    spyOnStorage.get.and.callFake((key, callback) => {
      callback(generateMockResult(key, TEST_DATA))
    })

    storage.getTime().then((t) => {
      expect(spyOnStorage.get).toHaveBeenCalled()
      expect(t).toBe(TEST_DATA)
      done()
    })
  })

  it('should save data to local storage.', (done) => {
    spyOnStorage.set.and.callFake((key, callback) => {
      callback(TEST_DATA_ALT)
    })

    storage.saveTime(TEST_DATA_ALT).then((t) => {
      expect(spyOnStorage.set).toHaveBeenCalled()
      expect(spyOnStorage.set.calls.argsFor(0)[0][STORAGE_KEY]).toEqual(TEST_DATA_ALT)
      expect(t).toBe(TEST_DATA_ALT)
      done()
    })
  })
})
