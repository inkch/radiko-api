const Axios = require('axios');
const fxp = require('fast-xml-parser');

const RadikoApi = () => {
  function getXml(path) {
    const axios = Axios.create({
      baseURL: 'http://radiko.jp/v3',
      headers: {
        'ContentType': 'application/xml',
        'X-Requested-With': 'XMLHttpRequest'
      },
      responseType: 'xml'
    });
    return new Promise((resolve, reject) => {
      axios.get(path)
        .then((res) => {
          const options = {
            attributeNamePrefix : "",
            attrNodeName: "attr", //default is 'false'
            ignoreAttributes: false
          };
          resolve(fxp.parse(res.data, options));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  function progs(areaId) {

    function today() {
      return getXml(`/program/today/${areaId}.xml`)
    }

    function now() {
      return getXml(`/program/now/${areaId}.xml`)
    }

    function weekly(stationId) {
      return getXml(`/program/station/weekly/${stationId}.xml`)
    }

    function date(date, stationId) {
      let filename = `${areaId}.xml`;
      let path = `date/${type}`;
      if (stationId !== null && stationId !== undefined) {
        filename = `${stationId}.xml`;
        path = `/station/${path}`;
      }
      return getXml(`/program/${path}/${filename}`);
    }

    return {
      today,
      now,
      weekly,
      date
    }
  }

  function stations(areaId) {
    return getXml(`/station/list/${areaId}.xml`);
  }

  return {
    progs,
    stations,
  }
}

module.exports = RadikoApi;
