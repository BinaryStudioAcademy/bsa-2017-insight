const selectionRepository = require('../../repositories/selectionRepository');

module.exports = (app) => {

  app.get('/api/selections', (req, res, next) => {
    selectionRepository.getAll((err, data) => {
      if (err) return next(err);
      return res.status(200).json(data);
    });
  });

  app.get('/api/selections/:id', (req, res, next) => {
    selectionRepository.getByIdAndPopulate(req.params.id, (err, data) => {
      if (err) return next(err);
      return res.status(200).json(data);
    });
  });

  app.post('/api/selections', (req, res, next) => {
    selectionRepository.add(req.body, (err, data) => {
      if (err) return next(err);
      return res.status(201).json(data);
    });
  });

  app.delete('/api/selections/:id', (req, res, next) => {
    selectionRepository.delete(req.params.id, (err, data) => {
      if (err) return next(err);
      return res.status(200).json(data);
    });
  });

  // UPDATE!!!

};
