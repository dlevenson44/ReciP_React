//import dependencies
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

//import files
const init = require('./passport')
const User = require('../../models/user.js')
const authHelpers = require('./auth-helpers')

//set options object
const options = {};

//run passport functions
init();

passport.use(
	new LocalStrategy(options, (username, password, done) => {
		User.findByUserName(username)
		.then(user => {
			if (!user) {
				return done(null, false)
			}
			if (!authHelpers.comparePass(password, user.password_digest)) {
				return done(null, false)
			} else {
				return done(null, user)
			}
		}).catch(err => {
			console.log(err)
			return done(err)
		})
	})
);

module.exports = passport;