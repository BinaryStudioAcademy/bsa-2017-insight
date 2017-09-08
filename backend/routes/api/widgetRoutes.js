const widgetRepository = require('../../repositories/widgetRepository');

module.exports = (app) => {
  app.get('/api/widgets/:id', (req, res) => {
    // const websiteName = req.params.name;
    const appId = req.params.id;
    widgetRepository.findByAppId(appId, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.post('/api/widgets/', (req, res) => {
    widgetRepository.add(req.body, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(201).json(data);
      }
    });
  });

  app.put('/api/widgets/:id', (req, res) => {
    const appId = req.params.id;
    widgetRepository.updateOrCreateByAppId(appId, req.body, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.delete('/api/widgets/:id', (req, res) => {
    const id = req.params.id;
    widgetRepository.delete(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });
};
