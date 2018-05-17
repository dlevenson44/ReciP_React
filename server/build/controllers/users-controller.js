'use strict';

// import dependencies
var bcrypt = require('bcryptjs');
var User = require('../models/user.js');

// initiate usersController object
var usersController = {};

// pull all usernames and emails
usersController.findUsernamesAndEmails = function (req, res, next) {
	User.findAllUsernamesAndEmails().then(function (usernames) {
		res.json({
			message: 'usernames returned',
			data: { usernames: usernames }
		});
	}).catch(next);
};

// account creation
usersController.create = function (req, res, next) {
	var salt = bcrypt.genSaltSync();
	var hash = bcrypt.hashSync(req.body.password, salt);
	User.create({
		username: req.body.username,
		email: req.body.email,
		password_digest: hash
	}).then(function (user) {
		req.login(user, function (err) {
			if (err) return next(err);
			res.status(201).json({
				message: 'user created',
				auth: true,
				data: {
					user: user
				}
			});
		});
	}).catch(next);
};

// display profile info
usersController.show = function (req, res, next) {
	User.findByUserName(req.params.id).then(function (user) {
		res.json({
			message: 'ok',
			data: { user: user }
		});
	}).catch(next);
};

// update profile info
usersController.update = function (req, res, next) {
	var salt = bcrypt.genSaltSync();
	var hash = bcrypt.hashSync(req.body.password_digest, salt);
	User.update({
		username: req.body.username,
		email: req.body.email,
		password_digest: hash
	}, req.params.id).then(function (user) {
		console.log(req);
		res.json({
			message: 'Successfully updated user',
			data: { user: user }
		});
	}).catch(next);
};

// delete profile
usersController.delete = function (req, res, next) {
	User.destroy(req.params.id).then(function () {
		res.json({
			message: 'Successfully deleted user'
		});
	}).catch(next);
};

// export controller
module.exports = usersController;