'use strict';

//import dependencies
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//import files
var init = require('./passport');
var User = require('../../models/user.js');
var authHelpers = require('./auth-helpers');

//set options object
var options = {};

//run passport functions
init();

passport.use(new LocalStrategy(options, function (username, password, done) {
	User.findByUserName(username).then(function (user) {
		if (!user) {
			return done(null, false);
		}
		if (!authHelpers.comparePass(password, user.password_digest)) {
			return done(null, false);
		} else {
			return done(null, user);
		}
	}).catch(function (err) {
		console.log(err);
		return done(err);
	});
}));

module.exports = passport;