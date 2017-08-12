const userRoutes = require('./userRoutes');
const passwordRoutes = require('./passwordRoutes');

module.exports = function (app) {
  return {
    userRoutes: userRoutes(app),
    passwordROutes: passwordRoutes(app),
  };
};
