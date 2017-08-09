const userRoutes = require('./userRoutes');
const uploadRoutes = require('./uploadRoutes');

module.exports = function (app) {
  return {
    userRoutes: userRoutes(app),
    uploadRoutes: uploadRoutes(app),
  };
};
