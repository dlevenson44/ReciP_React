'use strict';

// import dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

//initialize app
var app = express();
// SET PORT
var PORT = process.env.PORT || 3001;
//configure dotenv
require('dotenv').config();

//setting up middleware
app.use(logger('dev'));
// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	key: process.env.SECRET_KEY,
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

app.use(function (req, res, next) {
	console.log('---', req.user, req.path);
	next();
});

//app listening on port 3001

app.listen(PORT, function () {
	console.log('LISTENING ON PORT ' + PORT);
});

app.get('/', function (req, res) {
	res.send('Hello World!');
});

// routes
var authRoutes = require('./routes/auth-routes');
app.use('/api/auth', authRoutes);
var recipeRoutes = require('./routes/recipe-routes');
app.use('/api/recipes', recipeRoutes);

// error handlers
app.use('*', function (req, res) {
	res.status(400).json({
		message: 'Not found!'
	});
});

app.use(function (err, req, res, next) {
	console.log(err);
	res.status(500).json({
		error: err,
		message: err.message
	});
});