const express = require('express');
const path = require('path');
const { PORT } = require('./constants');
const { getPageWithMetatags } = require('./getPageWithMetatags');

const app = express();

// static resources should just be served as they are
app.use(
  express.static(path.resolve(__dirname, '..', 'frontend', 'build'), {
    maxAge: '30d',
    index: false,
  })
);

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
