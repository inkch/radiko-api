const radikoApi = require('../radiko-api');
const fs = require('fs');
const assert = require('assert');

function isFunc(target) {
  return "function" === typeof target;
}

describe('Authentication', function() {
  it('function exists', function() {
    assert(isFunc(radikoApi.auth))
  });

  describe('#auth', function() {
    let res;
    it('success', function(done) {
      radikoApi.auth().then( response => {
        res = response;
        assert(res);
        assert(res.success === true);
        assert(res.token)
        assert(res.partialKey)
        assert(res.key)
        assert(res.playerFile)
        done();
      });
    });
    it('player file exists', function() {
      assert(fs.existsSync(res.playerFile));
    });
    it('key file exists', function() {
      assert(fs.existsSync(res.key));
    });
  });
});
