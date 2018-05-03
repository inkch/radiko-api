const radikoApi = require('../radiko-api');
const assert = require('assert');

function isFunc(target) {
  return "function" === typeof target;
}

describe('Get stations list', function() {
  it('function exists', function() {
    assert(isFunc(radikoApi.stations))
  });

  describe('response', function() {
    let response;
    it('response exists', function() {
      return radikoApi.stations().then( res => {
        response = res;
        assert(res);
      });
    });
    it('station array exists', function() {
      assert('object' === typeof response.stations.station);
    });

    describe('station info (TBS)', function() {
      let tbs;
      it('data exists', function() {
        tbs = response.stations.station.filter( st => st.id === "TBS" )[0];
        assert(tbs);
      });
      describe('has key', () => {
        it('id',         () => assert(tbs.id));
        it('name',       () => assert(tbs.name));
        it('ascii_name', () => assert(tbs.ascii_name));
        it('areafree',   () => assert(tbs.areafree));
        it('timefree',   () => assert(tbs.timefree));
        it('logo',       () => assert(tbs.logo));
        it('banner',     () => assert(tbs.banner));
        it('href',       () => assert(tbs.href));
      });
    });
  });
});
