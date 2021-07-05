var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
var indexRouter = require('./routes/index');
var countryRouter = require('./routes/country');
const Multer = require('multer');
const { diskStorage } = require('multer');
var app = express();
var storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name + '.jpg') //Appending .jpg
  }
})

var upload = Multer({ storage: storage });
app.use(upload.single('file'));
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// for parsing multipart/form-data

app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/api/v1/country', countryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
