const util = require('./util.js');
const areaId = require('./areaId.js');

const stations = async (area) => {
  const target = area || await areaId();
  const s = await util.getJson(`/station/list/${target}.xml`);
  return s;
};

module.exports = stations;
