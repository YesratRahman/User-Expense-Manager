var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var transactionRouter = require('./routes/transaction');
var incomeRouter = require('./routes/income');

var cors = require('cors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Add routes that don't require authentication here:
// Allow the broswer to interact with our server 
// It has to be first before JWT.
app.use(cors());
// Use JWT
app.use(pullToken);
app.use('/users', usersRouter);
app.use('/', indexRouter);


//Add routes that require authentication here:
  app.use('/transaction', transactionRouter);
  app.use('/income', incomeRouter);

  incomeRouter
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, function () {
  console.log(`Server is listening at http://localhost:` + port)
});

function pullToken(req, res, next) {
  const header = req.headers['authorization'];
  if (header != undefined) {
    const token = header.split(' ')[1];
    req.token = token;
  }
  next();
}
