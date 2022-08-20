const fs = require('fs');
const { indexPath, defaultPic } = require('./constants');
const { getStore } = require('./getStore');
const striptags = require('striptags');

function getPageWithMetatags(storeName) {
  return new Promise((resolve, reject) => {
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
      if (err) {
        return reject({ code: 404, message: 'Error during file reading' });
      }

      if (storeName) {
        getStore(storeName)
          .then((store) => {
            const { store_data } = store;
            htmlData = htmlData
              .replace(
                '<title>Rye Store</title>',
                `<title>${[striptags(store_data?.promoter?.name), 'Rye store']
                  .filter(Boolean)
                  .join(' | ')}</title>`
              )
              .replace(/__META_TITLE__/g, striptags(store_data?.title) || 'Unnamed store')
              .replace(
                /__META_DESCRIPTION__/g,
                striptags(store_data?.description) ||
                  'No description provided for this store. Rye Stores is a free store builder for creators to easily start monetizing their audience. Anyone can easily start earning by recommending the products they use and love'
              )
              .replace(/__META_IMAGE__/g, store_data?.promoter?.avatar || defaultPic);

            resolve(htmlData);
          })
          .catch((err) => {
            resolve(htmlData);
          });
      } else {
        htmlData = htmlData
          .replace('__META_OG_TITLE__', 'Rye store builder')
          .replace(
            '__META_DESCRIPTION__',
            'Rye Stores is a free store builder for creators to easily start monetizing their audience. Anyone can easily start earning by recommending the products they use and love. All you need is a the URL of the product you want to promote and an audience/friends to share to.'
          )
          .replace('__META_IMAGE__', defaultPic);

        resolve(htmlData);
      }
    });
  });
}

module.exports = {
  getPageWithMetatags,
};
