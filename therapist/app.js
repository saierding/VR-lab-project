var express = require('express');
var ejs = require('ejs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');
var index = require('./routes/index');
var signin = require('./routes/signin');
var patient_list = require('./routes/patient_list');
var setting = require('./routes/setting');
var treatment = require('./routes/treatment');
var survey = require('./routes/survey');
var session=require('express-session');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("Luck"));
app.use(session({
    secret:'luck',
    resave:false,
    saveUninitialized:true
}));

app.use(express.static(path.join(__dirname, 'views')));

app.use('/', index);
app.use('/', patient_list);
app.use('/', signin);
app.use('/', setting);
app.use('/', treatment);
app.use('/', survey);
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;

app.listen(3000,'127.0.0.1')