const commonRoutes = require('./commonRoutes');

module.exports = app => ({ commonRoutes: commonRoutes(app) });
