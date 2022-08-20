const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

module.exports = {
  API_BASE_URL: process.env.REACT_APP_API_URL,
  indexPath: path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'),
  PORT: process.env.PORT,
  defaultPic: 'https://storage.googleapis.com/store-builder-images/images/operator-icon.png',
};
