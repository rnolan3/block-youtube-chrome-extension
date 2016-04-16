module.exports = function mockVideoElem () {
  return jasmine.createSpyObj('video', ['addEventListener', 'pause', 'play'])
}
