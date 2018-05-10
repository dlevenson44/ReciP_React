// import dependencies
const express = require('express')
const recipeHelpers = require('../services/recipes/recipe-helpers')
const recipesController = require('../controllers/recipes-controller')

const recipesRouter = express.Router()

recipesRouter.get('/:search', recipeHelpers.getRecipes, recipesController.sendApiRecipe)
recipesRouter.post('/create', recipesController.create)

module.exports = recipesRouter;
