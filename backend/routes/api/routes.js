const userRoutes = require('./userRoutes');
const conversationRoutes = require('./conversationRoutes');
const messageRoutes = require('./sessionRoutes');
const sessionRoutes = require('./messageRoutes');

module.exports = function (app) {
    return { userRoutes, conversationRoutes, messageRoutes, sessionRoutes };
};
