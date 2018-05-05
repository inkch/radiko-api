const moment = require('moment');
const Axios = require('axios');
const fs = require('fs');
const exec = require('await-exec');
const Const = require('./const.js');

const createDirIfNeeded = (dirname) => {
  if (fs.existsSync(dirname)) return;
  fs.mkdirSync(dirname);
};

const createPlayerFile = async () => {
  const date = moment().format('YYYYMMDD-HH');
  const path = `${Const.dir.auth}/player.${date}.swf`;

  if (fs.existsSync(path)) return path;

  const res = await Axios.create().get(Const.url.player, {
    responseType: 'arraybuffer',
  });

  createDirIfNeeded(Const.dir.auth);
  fs.writeFileSync(path, res.data);
  return path;
};

const createKeyFile = async (playerFile) => {
  const date = moment().format('YYYYMMDD-HH');
  const path = `${Const.dir.auth}/authkey.${date}.jpg`;

  if (fs.existsSync(path)) return path;

  createDirIfNeeded(Const.dir.auth);

  await exec(`swfextract -b 12 ${playerFile} -o ${path}`, true);
  return path;
};

const auth1 = async () => {
  const res = await Axios.create()({
    method: 'POST',
    url: Const.url.auth1,
    headers: {
      Host: 'radiko.jp',
      pragma: 'no-cache',
      'X-Radiko-App': 'pc_ts',
      'X-Radiko-App-Version': '4.0.0',
      'X-Radiko-User': 'test-stream',
      'X-Radiko-Device': 'pc',
    },
  });

  return {
    token: res.headers['x-radiko-authtoken'],
    keyOffset: parseInt(res.headers['x-radiko-keyoffset'], 10),
    keyLength: parseInt(res.headers['x-radiko-keylength'], 10),
  };
};


const getPartialKey = async (key, token, keyOffset, keyLength) =>
  new Promise((resolve, reject) => {
    const range = {
      start: keyOffset,
      end: (keyOffset + keyLength) - 1,
    };
    const rs = fs.createReadStream(key, { start: range.start, end: range.end });
    rs.on('data', chunk => resolve(chunk.toString('base64')));
    rs.on('error', error => reject(error));
  });

const auth2 = async (token, partialKey) => {
  const res = await Axios.create()({
    method: 'POST',
    url: Const.url.auth2,
    headers: {
      pragma: 'no-cache',
      'X-Radiko-App': 'pc_ts',
      'X-Radiko-App-Version': '4.0.0',
      'X-Radiko-User': 'test-stream',
      'X-Radiko-Device': 'pc',
      'X-Radiko-Authtoken': token,
      'X-Radiko-Partialkey': partialKey,
    },
  });

  return {
    areaId: res.data,
    headers: res.headers,
  };
};

const auth = async () => {
  const playerFile = await createPlayerFile();
  const key = await createKeyFile(playerFile);
  const { token, keyOffset, keyLength } = await auth1();
  const partialKey = await getPartialKey(key, token, keyOffset, keyLength);
  await auth2(token, partialKey);
  return {
    success: true,
    token,
    partialKey,
    key,
    playerFile,
  };
};

module.exports = auth;
