// const userRoutes = require('./userRoutes');
const appRoutes = require('./appRoutes');

module.exports = function(app) {
    return {
        // userRoutes: userRoutes(app),
        appRoutes: appRoutes(app)
    };
};
