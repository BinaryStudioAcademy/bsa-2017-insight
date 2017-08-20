module.exports = (app) => {
  app.get('/api/currentuser', (req, res) => {
    console.log('--USER--');
    console.log(req.user);
    res.status(200).json(req.user);
  });
};
