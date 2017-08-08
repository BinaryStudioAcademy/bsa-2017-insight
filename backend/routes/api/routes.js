const userRoutes = require('./userRoutes');
const appRoutes = require('./appRoutes');
const chatRoutes = require('./chatRoutes');
const messageRoutes = require('./messageRoutes');
const supportRoutes = require('./supportRoutes');
const supportTypeRoutes = require('./supportTypeRoutes');

module.exports = function(app) {
    return {
        userRoutes: userRoutes(app),
        appRoutes: appRoutes(app),
        messageRoutes: messageRoutes(app),
        chatRoutes: chatRoutes(app),
        supportRoutes: supportRoutes(app),
        supportTypeRoutes: supportTypeRoutes(app)
    };
};
