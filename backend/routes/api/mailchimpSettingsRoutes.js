const Mailchimp = require('mailchimp-api-v3');
const mailchimpSettingsRepository = require('../../repositories/mailchimpSettingsRepository');

module.exports = function (app) {

  app.get('/api/mailchimp/settings', (req, res, next) => {
    mailchimpSettingsRepository.findByAppId(req.user.appId, (err, settings) => {
      if (err) return next(err);
      res.json(settings);
    });
  });

  app.put('/api/mailchimp/settings', (req, res, next) => {
    mailchimpSettingsRepository.update(req.user.appId, req.body, (err, data) => {
      if (err) return next(err);
      res.json(data);
    });
  });

};
