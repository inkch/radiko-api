const Axios = require('axios');
const fxp = require('fast-xml-parser');

const RadikoApi = () => {
  async function getXml(url) {
    const axios = Axios.create({
      headers: {
        'ContentType': 'application/xml',
        'X-Requested-With': 'XMLHttpRequest'
      },
      responseType: 'xml'
    });

    const response = await axios.get(url)
    return response.data;
  }

  async function getJson(path) {
    const xml = await getXml('http://radiko.jp/v3' + path);
    return fxp.parse(xml, {
      attributeNamePrefix : "",
      attrNodeName: "attr", //default is 'false'
      ignoreAttributes: false
    });
  }

  async function getAreaId() {
    const raw = await getXml('http://radiko.jp/area');
    return raw.match(/JP\d{2}/)[0];
  }

  const progs = {
    today: async (stationId) => {
      let filename, path;
      if (stationId === undefined) {
        const areaId = await getAreaId();
        return await getJson(`/program/today/${areaId}.xml`);
      }
      return await getJson(`/program/station/today/${stationId}.xml`);
    },

    now: async () => {
      const areaId = await getAreaId();
      return await getJson(`/program/now/${areaId}.xml`)
    },

    weekly: async (stationId) => {
      const areaId = await getAreaId();
      return await getJson(`/program/station/weekly/${stationId}.xml`)
    },

    date: async (date, stationId) => {
      let filename, path;
      if (stationId === undefined) {
        const areaId = await getAreaId();
        return await getJson(`/program/date/${date}/${areaId}.xml`);
      }
      return await getJson(`/program/station/date/${date}/${stationId}.xml`);
    },
  }

  async function stations(areaId) {
    if (areaId === undefined) areaId = await getAreaId();
    return await getJson(`/station/list/${areaId}.xml`);
  }

  return {
    progs,
    stations,
    getAreaId
  }
}

module.exports = RadikoApi;
