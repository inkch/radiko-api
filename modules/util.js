const Axios = require('axios');
const fxp = require('fast-xml-parser');

const util = (() => {
  async function getXml(url) {
    const axios = Axios.create({
      headers: {
        ContentType: 'application/xml',
        'X-Requested-With': 'XMLHttpRequest',
      },
      responseType: 'xml',
    });

    const response = await axios.get(url);
    return response.data;
  }

  async function getJson(path) {
    const url = `http://radiko.jp/v3${path}`;
    const xml = await getXml(url);
    return fxp.parse(xml, {
      attributeNamePrefix: '',
      attrNodeName: 'attr',
      ignoreAttributes: false,
    });
  }

  return {
    getXml,
    getJson,
  };
})();

module.exports = util;
