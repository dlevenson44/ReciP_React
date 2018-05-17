'use strict';

// require dependency
var passport = require('passport');
// import User model
var User = require('../../models/user.js');

module.exports = function () {
	passport.serializeUser(function (user, done) {
		done(null, user.username);
	});

	passport.deserializeUser(function (username, done) {
		User.findByUserName(username).then(function (user) {
			done(null, user);
		}).catch(function (err) {
			done(err, null);
		});
	});
};