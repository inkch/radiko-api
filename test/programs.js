const radikoApi = require('../radiko-api');
const assert = require('assert');

function isFunc(target) {
  return 'function' === typeof target;
}

describe('Get program info', () => {

  describe('#today', () => {
    it('function exists', (done) => {
      assert(isFunc(radikoApi.progs.today));
      done();
    });
    describe('response', () => {
      it('All stations', (done) => {
        radikoApi.progs.today()
          .then( res => {
            assert(res);
            done();
          });
      });
      it('Specific station (TBS)', (done) => {
        const stationId = "TBS";
        radikoApi.progs.today(stationId).then( res => {
          assert(res);
          done();
        });
      });
    });
  });

  describe('#date', () => {
    it('function exists', () => assert(isFunc(radikoApi.progs.date)))

    describe('response', () => {
      const today = (() => { // yyyymmdd as string
        const now = new Date();
        return now.getFullYear()
          + ('0' + (now.getMonth()+1)).slice(-2)
          + ('0' + (now.getDate())).slice(-2)
      })();

      it('All stations', (done) => {
        radikoApi.progs.date(today).then( res => {
          assert(res);
          done()
        });
      });
      it('Specific station (TBS)', (done) => {
        const stationId = "TBS";
        radikoApi.progs.date(today, stationId).then( res => {
          assert(res);
          done();
        });
      });
    });
  });

  describe('#now', () => {
    it('function exists', () => assert(isFunc(radikoApi.progs.now)))
    it('response exists', (done) => {
      radikoApi.progs.now().then( res => {
        assert(res);
        done()
      });
    });
  });

  describe('#weekly', () => {
    it('function exists', () => assert(isFunc(radikoApi.progs.weekly)))
    it('response exists (TBS)', (done) => {
      const stationId = "TBS";
      radikoApi.progs.weekly(stationId).then( res => {
        assert(res);
        done();
      });
    });
  });
})
