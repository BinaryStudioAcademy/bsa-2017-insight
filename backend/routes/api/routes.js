const userRoutes = require('./userRoutes');

module.exports = function (app) {
    return {
        userRoutes: userRoutes(app)
    };
};
