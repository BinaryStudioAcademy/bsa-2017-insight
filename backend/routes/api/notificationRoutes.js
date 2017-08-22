const notificationService = require('../../services/notificationService');

module.exports = function(app) {

  app.post('/api/notification/messagetouser', (req, res, next) => {
    notificationService.messageToUser(req.body, (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).send('Success');
      }
    });
  });

}