const ForceMessageRepository = require('../../repositories/forceMessageRepository');

module.exports = (app) => {
  app.get('/api/force-messages/:id', (req, res) => {
    const id = req.params.id;
    ForceMessageRepository.getById(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.get('/api/force-messages/all/:id', (req, res) => {
    const appId = req.params.id;
    ForceMessageRepository.getAllByAppId(appId, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.post('/api/force-messages/', (req, res) => {
    console.log('WHRE IS MY FORCE-MESSAGE:', req.body);
    ForceMessageRepository.add(req.body, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(201).json(data);
      }
    });
  });

  app.put('/api/force-messages/:id', (req, res) => {
    const id = req.params.id;
    ForceMessageRepository.update(id, req.body, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.delete('/api/force-messages/:id', (req, res) => {
    const id = req.params.id;
    ForceMessageRepository.delete(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });
};
