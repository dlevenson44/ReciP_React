'use strict';

// import dependencies
var express = require('express');
var recipeHelpers = require('../services/recipes/recipe-helpers');
var recipesController = require('../controllers/recipes-controller');

var recipesRouter = express.Router();

recipesRouter.get('/favorites', recipesController.index);
recipesRouter.get('/:search', recipeHelpers.getRecipes, recipesController.sendApiRecipe);
recipesRouter.post('/create', recipesController.create);
recipesRouter.delete('/favorites/:id', recipesController.delete);

module.exports = recipesRouter;