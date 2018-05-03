const radikoApi = require('../radiko-api');
const assert = require('assert');

function isFunc(target) {
  return "function" === typeof target;
}

describe('radikoApi Client', function() {
  describe('basis', function() {
    it('module exists', function() {
      assert(null !== radikoApi)
      assert(undefined !== radikoApi)
    });
  });
})
