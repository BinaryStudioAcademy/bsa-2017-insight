const bodyParser = require('body-parser'),
  context = require('./units/context'),
  express = require('express'),
  mongooseConnection = require('./db/dbConnect').connection,
  path = require('path'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  sessionSecret = require('./config/session').secret,
  mongoose = require('mongoose'),
  webpack = require('webpack'),
  webpackConfig = require('../webpack.config.js'),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
  expressSession = require('express-session'),
  LocalStrategy = require('passport-local').Strategy,
  flash = require('connect-flash'),
  port = 3000;

const app = express();

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

const staticPath = path.resolve(__dirname + '/../dist/');
app.use(express.static(staticPath));
app.use('/resources', express.static('./frontend/src/common/resources'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(sessionSecret));

app.use(session({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const initPassport = require('./passport/init');
initPassport(passport);

context.mongoStore = new MongoStore({
  mongooseConnection,
});


app.use(function (req, res, next) {
  //console.log(req.session.user);
  next();
});

const apiRoutes = require('./routes/api/routes')(app),
  viewRoutes = require('./routes/view/routes')(app);

console.log(`app runs on port: ${port}`);
const server = app.listen(port);

module.exports = app;