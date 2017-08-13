const path = require('path');

module.exports = (app) => {
  app.get('*', (req, res) => {
    res.header = ('Content-Type', 'text/html');
    res.sendFile(path.resolve(`${__dirname}/../../../index.html`));
  });
};
