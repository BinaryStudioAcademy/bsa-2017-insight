const messageRoutes = require('./messageRoutes');
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const conversationRoutes = require('./conversationRoutes');
const widgetRoutes = require('./widgetRoutes');
const statisticsRoutes = require('./statisticsRoutes');
const passwordRoutes = require('./passwordRoutes');
const uploadRoutes = require('./uploadRoutes');
const notificationRoutes = require('./notificationRoutes');
const settingsRoutes = require('./settingsRoutes');
const selectionRoutes = require('./selectionRoutes');
const faqRoutes = require('./faqRoutes');
const conversationFilterRoutes = require('./conversationFilterRoutes');
const appRoutes = require('./appRoutes');
const forceMessagesRoutes = require('./forceMessagesRoutes');

module.exports = app => ({
  messageRoutes: messageRoutes(app),
  userRoutes: userRoutes(app),
  conversationRoutes: conversationRoutes(app),
  widgetRoutes: widgetRoutes(app),
  statisticsRoutes: statisticsRoutes(app),
  adminRoutes: adminRoutes(app),
  passwordRoutes: passwordRoutes(app),
  notificationRoutes: notificationRoutes(app),
  uploadRoutes: uploadRoutes(app),
  settingsRoutes: settingsRoutes(app),
  selectionRoutes: selectionRoutes(app),
  faqRoutes: faqRoutes(app),
  conversationFilterRoutes: conversationFilterRoutes(app),
  appRoutes: appRoutes(app),
  forceMessagesRoutes: forceMessagesRoutes(app),
});
