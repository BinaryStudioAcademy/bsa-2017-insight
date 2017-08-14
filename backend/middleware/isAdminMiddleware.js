function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.send('Access forbidden for non-admin users and visitors');
  }
}

module.exports = isAdmin;
