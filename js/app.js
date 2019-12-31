//  Dependencies
var session = require('express-session'); // <- Sessions (implement later)
var bodyParser = require('body-parser');
// var passport = require('passport'); <- Social Authentication (implement later)
var favicon = require('serve-favicon');
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
require('colors');  //  Used solely for coloured console output.

//  Globals.
global.version = JSON.parse(fs.readFileSync("package.json", "utf8")).version;
global.root_path = path.resolve(__dirname + "/../");
global.port = 443;   // For HTTPS

console.log('Launching Cod App'.cyan + `v${global.version}`.yellow);

//  Declare publicly accessable folders
app.use('/js', express.static(path.resolve(global.root_path + '/js/client')));
app.use('/css', express.static(path.resolve(global.root_path + '/css')));
app.use('/images', express.static(path.resolve(global.root_path + '/images')));

// Set favicon
app.use(favicon('favicon.ico'))
// Set App Properties
app.set('views', path.resolve(global.root_path + '/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
   secret: 's3cr3t',
   resave: true,
   saveUninitialized: true
 }));
//  app.use(passport.initialize());
//  app.use(passport.session());


// Routes
app.use('/', require('../routes/index')());

// User pages.
app.use('/User', require('../routes/User')());

app.use('/API', require('../routes/API')());

// Error Handling
app.use(function(req, res, next){   // 404 not found error
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
});

// Actual error handler
app.use(function(err, req, res, next) {
   // render the error page
   res.status(err.status || 500);
   res.render('error.ejs', {title: "Error", error: err});
});

module.exports = app;
