var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/ab?cd', (req, res) => {
  res.send('ab?cd');
});

//cấu hình một route mới
app.get('/blog', (req, res, next)=>{
  //body params
  console.log('Query Params',req.query)
  console.log('>>>Blog route accessed>>>');
  res.send('Welcome to the Blog!');
})

//VD 1 DYNAMIC ROUTE
app.get('/blog/:id', (req, res, next)=>{
  console.log('>>>Blog ID route accessed with ID>>>',req.params.id);
  res.send(`Blog post with ID: ${req.params.id}`);
})

// CÁC METHOD KHÁC
app.post('/blog', (req, res, next)=>{
  //body params
  console.log('Body Params: ',req.body);
  console.log('>>>Blog POST route accessed>>>');
  //res.send('Blog POST request recived!');
  res.status(201).json(req.body)
})

app.put('/blog', (req, res, next)=>{
  console.log('>>>Blog PUT route accessed>>>');
  res.send('Blog PUT request recived');
})

app.delete('/blog', (req, res, next)=>{
  console.log('>>>Blog DELETE route accessed>>>');
  res.send('Blog DELETE request recived');
})

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

module.exports = app;
