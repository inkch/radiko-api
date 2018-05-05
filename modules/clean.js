const Const = require('./const.js');
const exec = require('await-exec');

const clean = async () => {
  await exec(`rm ${Const.dir.auth}/player*`);
  await exec(`rm ${Const.dir.auth}/auth*`);
};

module.exports = clean;
