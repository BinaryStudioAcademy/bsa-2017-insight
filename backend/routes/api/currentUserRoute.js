module.exports = (app) => {
  app.get('/api/currentuser', (req, res) => {
    res.status(200).json(req.user);
  });
};
