const messageRoutes = require('./messageRoutes');
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const conversationRoutes = require('./conversationRoutes');
const widgetRoutes = require('./widgetRoutes');
const statisticsRoutes = require('./statisticsRoutes');

module.exports = app => ({
  messageRoutes: messageRoutes(app),
  userRoutes: userRoutes(app),
  conversationRoutes: conversationRoutes(app),
  widgetRoutes: widgetRoutes(app),
  statisticsRoutes: statisticsRoutes(app),
  adminRoutes: adminRoutes(app),
});
