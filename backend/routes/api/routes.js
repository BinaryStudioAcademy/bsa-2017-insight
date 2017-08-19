const messageRoutes = require('./messageRoutes');
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const conversationRoutes = require('./conversationRoutes');
const widgetRoutes = require('./widgetRoutes');
const statisticsRoutes = require('./statisticsRoutes');
const passwordRoutes = require('./passwordRoutes');
const uploadRoutes = require('./uploadRoutes');
const currentUserRoute = require('./currentUserRoute');


module.exports = app => ({
  messageRoutes: messageRoutes(app),
  userRoutes: userRoutes(app),
  conversationRoutes: conversationRoutes(app),
  widgetRoutes: widgetRoutes(app),
  statisticsRoutes: statisticsRoutes(app),
  adminRoutes: adminRoutes(app),
  passwordRoutes: passwordRoutes(app),
  uploadRoutes: uploadRoutes(app),
  currentUserRoute: currentUserRoute(app),
});
