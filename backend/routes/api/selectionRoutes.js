const selectionRepository = require('../../repositories/selectionRepository');
const selectionService = require('../../services/selectionService');

module.exports = (app) => {

  app.get('/api/selections', (req, res, next) => {
    if (!req.user) return res.status(204).end();
    selectionService.getAllSelections(req.user.appId, (err, data) => {
      if (err) return next(err);
      // selectionRepository.getAll(req.user.appId, (intErr, intData) => {
      //   if (err) return next(intErr);
      //   return res.status(200).json(intData);
      // });
      return res.status(200).json(data);
    });
  });

  app.get('/api/selections/:id', (req, res, next) => {
    // selectionRepository.getByIdAndPopulate(req.params.id, (err, data) => {
    //   if (err) return next(err);
    //   return res.status(200).json(data);
    // });
    selectionService.getSingleSelection(req.user.appId, req.params.id, (err, data) => {
      if (err) return next(err);
      return res.status(200).json(data);
    });
  });

  app.post('/api/selections', (req, res, next) => {
    // selectionRepository.add(req.body, (err, data) => {
    //   if (err) return next(err);
    //   return res.status(201).json(data);
    // });
    selectionService.addSelection(req.user.appId, req.body, (err, data) => {
      if (err) return next(err);
      return res.status(200).json(data);
    });
  });

  app.delete('/api/selections/:id', (req, res, next) => {
    // selectionRepository.delete(req.params.id, (err, data) => {
    //   if (err) return next(err);
    //   return res.status(200).json(data);
    // });
    selectionService.deleteSelection(req.user.appId, req.params.id, (err, data) => {
      if (err) return next(err);
      return res.status(204).json(data);
    });
  });

  // UPDATE!!!

};
