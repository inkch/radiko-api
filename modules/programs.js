const util = require('./util.js');
const areaId = require('./areaId.js');

const programs = {
  today: async (stationId) => {
    if (stationId === undefined) {
      const area = await areaId();
      return await util.getJson(`/program/today/${area}.xml`);
    }
    return await util.getJson(`/program/station/today/${stationId}.xml`);
  },

  now: async () => {
    const area = await areaId();
    return await util.getJson(`/program/now/${area}.xml`);
  },

  weekly: async stationId => await util.getJson(`/program/station/weekly/${stationId}.xml`),

  date: async (date, stationId) => {
    if (stationId === undefined) {
      const area = await areaId();
      return await util.getJson(`/program/date/${date}/${area}.xml`);
    }
    return await util.getJson(`/program/station/date/${date}/${stationId}.xml`);
  },
};

module.exports = programs;
