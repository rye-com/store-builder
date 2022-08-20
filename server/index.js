const express = require('express');
const path = require('path');
const { PORT } = require('./constants');
const { getPageWithMetatags } = require('./getPageWithMetatags');
const { getTokens, getNftMetadata } = require('./walletApi');

const app = express();

// static resources should just be served as they are
app.use(
  express.static(path.resolve(__dirname, '..', 'frontend', 'build'), {
    maxAge: '30d',
    index: false,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/getTokens', (req, res, next) => {
  const publicKeyStr = req.query['publickey'];
  if (!publicKeyStr) {
    res.status(400).end();
  }
  getTokens(publicKeyStr)
    .then((tokens) => res.send(tokens))
    .catch(() => res.status(500).end());
});

app.get('/api/getNftMetadata', (req, res, next) => {
  const mintStr = req.query['mintstr'];
  if (!mintStr) {
    res.status(400).end();
  }
  getNftMetadata(mintStr)
    .then((tokens) => res.send(tokens))
    .catch(() => res.status(500).end());
});

// here we serve the index.html page
app.get('/*', (req, res, next) => {
  const hostnameParts = req.hostname.split('.');
  const storeName = hostnameParts.length ? hostnameParts[0] : undefined;
  getPageWithMetatags(storeName)
    .then((html) => res.send(html))
    .catch((err) => {
      if (err.code === 404) {
        res.status(404).end();
      }

      res.status(500).end();
    });
});

// listening...
app.listen(PORT, (error) => {
  if (error) {
    return console.log('Error during app startup', error);
  }
  console.log('listening on ' + PORT + '...');
});
