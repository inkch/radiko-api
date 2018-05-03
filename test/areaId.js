const radikoApi = require('../radiko-api');
const assert = require('assert');

function isFunc(target) {
  return "function" === typeof target;
}

describe('Get area id', function() {
  it('function exists', () => {
    assert(isFunc(radikoApi.areaId))
  })
  it('Area ID is JP13', function() {
    return radikoApi.areaId().then( areaId => {
      assert("JP13" === areaId)
    });
  })
});
