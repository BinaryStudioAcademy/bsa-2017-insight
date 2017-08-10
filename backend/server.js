const bodyParser = require('body-parser');
const context = require('./units/context');
const express = require('express');
const mongooseConnection = require('./db/dbConnect').connection;
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const sessionSecret = require('./config/session').secret;
const mongoose = require('mongoose');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const port = 3000;

const app = express();

app.use(session({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection,
  }),
}));

context.mongoStore = new MongoStore({
  mongooseConnection,
});

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));

const staticPath = path.resolve(`${__dirname}/../dist/`);
app.use(express.static(staticPath));
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));

app.use(bodyParser.json());
app.use((req, res, next) => {
  // console.log(req.session.user);
  next();
});

const apiRoutes = require('./routes/api/routes')(app);
const viewRoutes = require('./routes/view/routes')(app);

console.log(`app runs on port: ${port}`);
const server = app.listen(port);

module.exports = app;
