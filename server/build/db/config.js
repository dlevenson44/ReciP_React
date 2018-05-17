'use strict';

// set options object
var options = {
	query: function query(e) {
		// console log each query
		console.log(e.query);
	}

	// import pg-promise, assign to variable with options
};var pgp = require('pg-promise')(options);

// add conditional database for dev and test
function setDatabase() {
	if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
		return pgp({
			database: 'new_recipes_db',
			port: 5432,
			host: 'localhost'
		});
	} else if (process.env.NODE_ENV === 'production') {
		return pgp(process.env.DATABASE_URL);
	}
}

// call pgp conditional function
var db = setDatabase();

// export
module.exports = db;