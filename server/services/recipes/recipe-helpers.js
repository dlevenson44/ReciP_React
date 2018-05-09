// import dependencies
require('isomorphic-fetch')
require('dotenv').config()

function getRecipes(req, res, next) {
	// fetch URL
	fetch(`https://api.edamam.com/search?q=${req.params.search}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&from=0&to=30`)
	.then(res => res.json())
	// use res.locals to attach data to repsonse object
	.then(fetchRes => {
		// set fetched results to res.locals
		res.locals.recipe = fetchRes
		next()
	})
}

// export function
module.exports = {
	getRecipes: getRecipes,
}


