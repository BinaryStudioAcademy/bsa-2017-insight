module.exports = {
  dbname: 'insight',
  uri: 'mongodb://localhost/insight',
  mocked_db: false,
  opts: {
    server: {
      auto_reconnect: true,
      poolSize: 40
    },
    user: 'root'
  }
};
