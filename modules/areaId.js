const util = require('./util.js');

const areaId = async () => {
  const raw = await util.getXml('http://radiko.jp/area');
  return raw.match(/JP\d{2}/)[0];
};

module.exports = areaId;
