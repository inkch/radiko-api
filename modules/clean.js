const Const = require('./const.js');
const exec = require('await-exec');

const clean = async () => {
  await exec(`rm ${Const.dir.tmp}/player*`);
  await exec(`rm ${Const.dir.tmp}/auth*`);
};

module.exports = clean;
