module.exports = (app) => {
  app.get('/api/currentuser', (req, res) => {
    res.setStatus(200);
    res.setHeader('Content-Type', 'application/json');
    res.json(req.user);
  });
};
