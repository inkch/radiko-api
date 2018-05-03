const radikoApi = require('../radiko-api');
const fs = require('fs');
const assert = require('assert');
const exec = require('await-exec');
const Const = require('../modules/const');

function isFunc(target) {
  return "function" === typeof target;
}

describe('Clean tmp directory', function() {
  it('function exists', function() {
    assert(isFunc(radikoApi.clean))
  });

  describe('#clean', function() {
    it('delete all tmp files', (done) => {
      const playerFile = `${Const.dir.tmp}/player.20180513_01.swf`;
      const authkey =    `${Const.dir.tmp}/authkey.20180513_01.swf`;

      const prepare = async () => {
        await exec(`touch ${playerFile}`);
        await exec(`touch ${authkey}`);
      }
      prepare()
        .then(radikoApi.clean)
        .then(() => {
          assert(!fs.existsSync(playerFile));
          assert(!fs.existsSync(authkey));
          done();
        });
    });
  });
});
