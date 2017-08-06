const userRoutes = require('./userRoutes');
const messageRoutes = require('./messageRoutes');
const sessionRoutes = require('./sessionRoutes');
const chatRoutes = require('./chatRoutes');

module.exports = function (app) {
    return {
        userRoutes: userRoutes(app),
        messageRoutes: messageRoutes(app),
        sessionRoutes: sessionRoutes(app),
        chatRoutes: chatRoutes(app)
    };
};