// import dependencies
const express = require('express')
const recipesRoutes = express.Router()
const recipeHelpers = require('../services/recipes/recipe-helpers')
const recipesController = require('../controllers/recipes-controller')
const usersController = require('../controllers/users-controller')

// sett add route
recipesRoutes.get('/add', (req, res) => {
	res.render('favorite_recipes', {
		auth: (req.user) ? true : false,
	})
})

// set API fetch route
recipesRoutes.get('/:search', recipeHelpers.getRecipes, recipesController.sendApiRecipe)

// set create and show favorite routes
recipesRoutes.post('/', recipesController.create)
recipesRoutes.get('/:id', recipesController.show)
recipesRoutes.post('/favorite_recipes/:id', recipesController.create)

// set delete recipe
recipesRoutes.delete('/:id', recipesController.delete)

// export routes
module.exports = recipesRoutes