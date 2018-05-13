// import dependencies
const bcrypt = require('bcryptjs')
const User = require('../models/user.js')

// initiate usersController object
const usersController = {}

// pull all usernames
usersController.findUsernames = (req, res, next) => {
	User.findAllUsernames()
	.then(usernames => {
		res.json({
			message: 'usernames returned',
			data: { usernames }
		})
	}).catch(next)
}

// pull all emails
usersController.findEmails = (req, res, next) => {
	User.findAllEmails()
	.then(emails => {
		res.json({
			message: 'emails returned',
			data: { emails }
		})
	}).catch(next)
}

// account creation
usersController.create = (req, res, next) => {
	const salt = bcrypt.genSaltSync()
	const hash = bcrypt.hashSync(req.body.password, salt)
	User.create({
		username: req.body.username,
		email: req.body.email,
		password_digest: hash,
	}).then(user => {
		req.login(user, (err) => {
			if (err) return next(err)
				res.status(201).json({
					message: 'user created',
					auth: true,
					data: {
						user,
					}
				})
			}
		)
	}).catch(next)
}

// display profile info
usersController.show = (req, res, next) => {
	User.findByUserName(req.params.id)
	.then(user => {
		res.json({
			message: 'ok',
			data: { user },
		})
	}).catch(next)
}

// update profile info
usersController.update = (req, res, next) => {
	const salt = bcrypt.genSaltSync()
	const hash = bcrypt.hashSync(req.body.password_digest, salt)
	User.update({
		username: req.body.username,
		email: req.body.email,
		password_digest: hash,
	}, req.params.id).then(user => {
		console.log(req)
		res.json({
			message: 'Successfully updated user',
			data: { user },
		})
	}).catch(next)
}

// delete profile
usersController.delete = (req, res, next) => {
	User.destroy(req.params.id)
	.then(() => {
		res.json({
			message: 'Successfully deleted user',
		})
	}).catch(next)
}

// export controller
module.exports = usersController;