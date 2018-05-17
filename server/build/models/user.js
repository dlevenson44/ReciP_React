'use strict';

//import config file
var db = require('../db/config');

// initiate User object
var User = {};

// find all usernames and emails
User.findAllUsernamesAndEmails = function () {
	return db.query('SELECT username, email FROM users');
};

// find username function
User.findByUserName = function (userName) {
	return db.oneOrNone('\n\t\tSELECT * FROM users\n\t\tWHERE username = $1\n\t\t', [userName]);
};

// create user function
User.create = function (user) {
	return db.one('\n\t\tINSERT INTO users\n\t\t(username, email, password_digest)\n\t\tVALUES ($1, $2, $3)\n\t\tRETURNING *\n\t\t', [user.username, user.email, user.password_digest]);
};

// update user
User.update = function (user, id) {
	return db.one('\n\t\tUPDATE users SET\n\t\tusername = $1,\n\t\temail = $2,\n\t\tpassword_digest = $3\n\t\tWHERE id = $4\n\t\tRETURNING *\n\t\t', [user.username, user.email, user.password_digest, id]);
};

// delete user
User.destroy = function (id) {
	return db.none('\n\t\tDELETE FROM users\n\t\tWHERE ID = $1\n\t\t', [id]);
};

// export model
module.exports = User;