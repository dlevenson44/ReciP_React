// import dependencies
const express = require('express')
const recipesRouter = express.Router()
const recipeHelpers = require('../services/recipes/recipe-helpers')
const recipesController = require('../controllers/recipes-controller')

module.exports = function(app) {
	app.route('/')
		.post(recipesController.create)
		.get(recipeHelpers.getRecipes, recipesController.sendApiRecipe)
	
	app.route('/favorites')
		.get(recipesController.index)
		.delete(recipesController.delete)
	};