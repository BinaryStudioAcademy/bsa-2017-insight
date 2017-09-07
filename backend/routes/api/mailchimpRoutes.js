const Mailchimp = require('mailchimp-api-v3');
const mailchimpSettingsRepository = require('../../repositories/mailchimpSettingsRepository');

module.exports = function (app) {

  app.get('/api/mailchimp/lists', (req, res, next) => {
    mailchimpSettingsRepository.findByConditions({ appId: req.user.appId }, (err, settings) => {
      if (err)
        return next(err);
      if (!settings[0].apiKey)
        return res.status(204).end();
      new Mailchimp(settings[0].apiKey).get('/lists')
        .then((data) => {
          const filteredLists = data.lists.filter(list => list.name.indexOf('InSight-') === 0);
          filteredLists.forEach((list) => {
            list.name = list.name.substring(8, undefined);
          });
          res.json(filteredLists);
        }).catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    });
  });

  app.get('/api/mailchimp/lists/:id', (req, res, next) => {
    mailchimpSettingsRepository.findByConditions({ appId: req.user.appId }, (err, settings) => {
      if (err)
        return next(err);
      if (!settings[0].apiKey)
        return res.status(204).end();
      new Mailchimp(settings[0].apiKey).get(`/lists/${req.params.id}`)
        .then((data) => {
          data.name = data.name.substring(8, undefined);
          res.json(data);
        }).catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    });
  });

  app.post('/api/mailchimp/lists', (req, res, next) => {
    let body = req.body;
    body.name = `InSight-${body.name}`;
    body = Object.assign({
      contact: {
        company: 'InSight',
        address1: 'Far Far Away',
        city: 'Far Far Away',
        state: 'Far Far Away',
        zip: '1337',
        country: 'Far Far Away',
      },
      permission_reminder: 'You were subscribed to InSight mailings',
      campaign_defaults: {
        from_name: 'InSight',
        from_email: 'mail@server.net',
        subject: 'Message from InSight',
        language: 'English',
      },
      email_type_option: true,
    }, body);
    mailchimpSettingsRepository.findByConditions({ appId: req.user.appId }, (err, settings) => {
      if (err)
        return next(err);
      if (!settings[0].apiKey)
        return res.status(204).end();
      new Mailchimp(settings[0].apiKey).post('/lists', body)
        .then((data) => {
          res.json(data);
        }).catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    });
  });

  app.delete('/api/mailchimp/lists/:id', (req, res, next) => {
    mailchimpSettingsRepository.findByConditions({ appId: req.user.appId }, (err, settings) => {
      if (err)
        return next(err);
      if (!settings[0].apiKey)
        return res.status(204).end();
      new Mailchimp(settings[0].apiKey).delete(`/lists/${req.params.id}`)
        .then((data) => {
          res.json(data);
        }).catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    });
  });

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
