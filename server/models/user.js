//import config file
const db = require('../db/config')

// initiate User object
const User = {}

// find username function
User.findByUserName = userName => {
	return db.oneOrNone(`
		SELECT * FROM users
		WHERE username = $1
		`, [userName]);
};

// create user function
User.create = user => {
	return db.one(`
		INSERT INTO users
		(username, email, password_digest)
		VALUES ($1, $2, $3)
		RETURNING *
		`, [user.username, user.email, user.password_digest]);
};

// update user
User.update = (user, id) => {
	return db.one(`
		UPDATE users SET
		username = $1,
		email = $2,
		password_digest = $3
		WHERE id = $4
		RETURNING *
		`, [user.username, user.email, user.password_digest, id]);
}

// delete user
User.destroy = (id) => {
	return db.none(`
		DELETE FROM users
		WHERE ID = $1
		`, [id]);
}

// export model
module.exports = User;