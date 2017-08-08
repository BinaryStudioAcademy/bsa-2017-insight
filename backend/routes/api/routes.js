const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');

module.exports = function (app) {
    return {
        userRoutes: userRoutes(app),
        adminRoutes: adminRoutes(app)
    };
};
