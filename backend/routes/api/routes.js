const messageRoutes = require('./messageRoutes');
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const conversationRoutes = require('./conversationRoutes');
const widgetRoutes = require('./widgetRoutes');
const statisticsRoutes = require('./statisticsRoutes');
const uploadRoutes = require('./uploadRoutes');


module.exports = app => ({
  messageRoutes: messageRoutes(app),
  userRoutes: userRoutes(app),
  conversationRoutes: conversationRoutes(app),
  widgetRoutes: widgetRoutes(app),
  statisticsRoutes: statisticsRoutes(app),
  adminRoutes: adminRoutes(app),
  uploadRoutes: uploadRoutes(app),
});
