'use strict';

// bring in dependencies
var express = require('express');
var authRouter = express.Router();
var passport = require('../services/auth/local');
var authHelpers = require('../services/auth/auth-helpers');
var usersController = require('../controllers/users-controller');

// on /register page bring in create function from user controller
authRouter.post('/register', usersController.create);

// fetch all registered usernames and emails
authRouter.get('/taken', usersController.findUsernamesAndEmails);

// allow users to login on /login
authRouter.post('/login', passport.authenticate('local', {
	successRedirect: '/api/auth/verify',
	failureRedirect: '/api/auth/verify',
	failureFlash: true
}));

// handle routing after login attempt
authRouter.get('/verify', function (req, res) {
	//if authentication is successful
	if (req.user) return res.status(200).json({
		message: 'ok',
		auth: true,
		data: {
			user: req.user
		}
	});
	//if authentication fails
	else return res.status(400).json({
			message: 'Login failed',
			auth: false,
			data: {
				user: null
			}
		});
});

//handle logout
authRouter.get('/logout', function (req, res) {
	req.logout();
	res.json({
		message: 'logged out',
		auth: false,
		data: {
			user: null
		}
	});
});

authRouter.route('/:id').get(usersController.show).put(usersController.update).delete(usersController.delete);

module.exports = authRouter;