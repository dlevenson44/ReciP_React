// import dependencies
const express = require('express')
const recipeHelpers = require('../services/recipes/recipe-helpers')
const recipesController = require('../controllers/recipes-controller')

const recipesRouter = express.Router()

recipesRouter.get('/favorites', recipesController.index)
recipesRouter.get('/:search', recipeHelpers.getRecipes, recipesController.sendApiRecipe)
recipesRouter.post('/create', recipesController.create)
recipesRouter.delete('/favorites/:id', recipesController.delete)

module.exports = recipesRouter;
