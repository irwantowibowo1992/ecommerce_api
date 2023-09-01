var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// enable cors pre-flight
app.options('*', cors());
// somehow cors failed #Testing only
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const { getFullPath } = require('./src/utils/string.util');
const traverseDir = getFullPath(__dirname + '/routes/');

for (const fullPath of traverseDir) {
  app.use('/', require(fullPath));
}

app.use((err, req, res, next) => {
  if (typeof err.handle === 'function') {
    err.handle();
  }

  if (err.printMsg === undefined) {
    err.stack += ` [Path: ${req.path}]`;
    console.error(err);
  }

  res.status(err.statusCode || 500).json({
    code: err.statusCode || 500,
    msg: err.printMsg || 'Something went wrong!',
    errorCode: err.errorCode,
  });
});

module.exports = app;
