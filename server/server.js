// import dependencies
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

//initialize app
const app = express();
// SET PORT
const PORT = process.env.PORT || 3001;
//configure dotenv
require('dotenv').config();

//setting up middleware
app.use(logger('dev'));
// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	session({
		key: process.env.SECRET_KEY,
		secret: process.env.SECRET_KEY,
		resave: false,
		saveUninitialized: true,
	}),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

app.use((req, res, next) => {
	console.log('---', req.user, req.path);
	next();
});

//app listening on port 3001

app.listen(PORT, () => {
	console.log(`LISTENING ON PORT ${PORT}`)
})

app.get('/', (req, res) => {
	res.send('Hello World!')
});

// routes
const authRoutes = require('./routes/auth-routes')
app.use('/api/auth', authRoutes)
const recipeRoutes = require('./routes/recipe-routes')
app.use('/api/recipes', recipeRoutes)

// error handlers
app.use('*', (req, res) => {
	res.status(400).json({
		message: 'Not found!',
	});
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({
		error: err,
		message: err.message,
	});
});