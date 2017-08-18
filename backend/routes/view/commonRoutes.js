const injectData = require('../../middleware/injectedDataMiddleware');

module.exports = function (app) {
  app.get('*', (req, res) => {
    injectData(req, res, {}, false);
    console.log('Request from: ');
    console.log(req.user);
  });
};
