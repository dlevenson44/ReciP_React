// require dependency
const passport = require('passport')
// import User model
const User = require('../../models/user.js')

module.exports = () => {
	passport.serializeUser((user, done) => {
		done(null, user.username)
	})

	passport.deserializeUser((username, done) => {
		User.findByUserName(username)
		.then(user => {
			done(null, user)
		}).catch(err => {
			done(err, null)
		})
	})
}