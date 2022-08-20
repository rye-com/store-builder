const { API_BASE_URL } = require('./constants');
const https = require(API_BASE_URL.startsWith('https') ? 'https' : 'http');

function getStore(storeName) {
  const url = `${API_BASE_URL}/api/v1/store/fetch?store_name=${storeName}`;
  return new Promise((resolve, reject) => {
    https
      .get(url, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

module.exports = {
  getStore,
};
