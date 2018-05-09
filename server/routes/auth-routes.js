// bring in dependencies
const express = require('express')
const authRouter = express.Router()
const passport = require('../services/auth/local')
const authHelpers = require('../services/auth/auth-helpers')
const usersController = require('../controllers/users-controller')

// on /register page bring in create function from user controller
authRouter.post('/register', usersController.create)

// allow users to login on /login
authRouter.post('/login', passport.authenticate('local', {
	successRedirect: '/api/auth/verify',
	failureRedirect: '/api/auth/verify',
	failureFlash: true,
}))

// handle routing after login attempt
authRouter.get('/verify', (req, res) => {
	//if authentication is successful
	if (req.user) return res.status(200).json({
		message: 'ok',
		auth: true,
		data: {
			user: req.user,
		}
	})
	//if authentication fails
	else return res.status(400).json({
		message: 'Login failed',
		auth: false,
		data: {
			user: null,
		}
	})
})

//handle logout
authRouter.get('/logout', (req, res) => {
	req.logout()
	res.json({
		message: 'logged out',
		auth: false,
		data: {
			user: null,
		}
	})
})

authRouter.route('/:id')
	.get(usersController.show)
	.put(usersController.update)
	.delete(usersController.delete)

module.exports = authRouter;