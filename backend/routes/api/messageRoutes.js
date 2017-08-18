const messageRepository = require('../../repositories/messageRepository');

module.exports = (app) => {
  app.get('/api/messages/', (req, res) => {
    messageRepository.getAll((err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.get('/api/messages/:id', (req, res) => {
    const id = req.params.id;
    messageRepository.findOneAndPopulate(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.post('/api/messages/', (req, res) => {
    messageRepository.add(req.body, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(201).json(data);
      }
    });
  });

  app.put('/api/messages/:id', (req, res) => {
    const id = req.params.id;
    messageRepository.update(id, req.body.path, (err, data) => {
      if (err || data.nModified === 0) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.delete('/api/messages/:id', (req, res) => {
    const id = req.params.id;
    messageRepository.delete(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });
};

