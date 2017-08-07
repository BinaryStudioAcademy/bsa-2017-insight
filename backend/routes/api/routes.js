const userRoutes = require('./userRoutes');
const messageRoutes = require("./messageRoutes")
const chatRoutes = require("./chatRoutes")


module.exports = function (app) {
    return {
        userRoutes: userRoutes(app),
        messageRoutes: messageRoutes(app),
        chatRoutes: chatRoutes(app)
    };
};
