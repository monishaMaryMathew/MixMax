var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Client = require('node-rest-client').Client;
 
var client = new Client();
var uri = "http://giphy.com/gifs/excited-the-office-yes-t3Mzdx0SA3Eis";
var res = uri.replace(/\//g , "%2F").replace(/\:/g , "%3A");
var args = {
//    path: { "id": 120 },
    parameters: { url: res//"http%3A%2F%2Fgiphy.com%2Fgifs%2Fexcited-the-office-yes-t3Mzdx0SA3Eis"//, 
    //arg2: "world" 
    }//,
//    headers: { "test-header": "client-api" },
//    data: "<xml><arg1>hello</arg1><arg2>world</arg2></xml>"
};
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// direct way 
var req = client.get("https://localhost:9146/resolver", args,
function(data, response) { //("http://remote.site/rest/xml/method", function (data, response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
   // console.log(response);
    console.log('it worked!!!!!');
});

req.on('error', function (err) {
    console.log('request error', err);
});