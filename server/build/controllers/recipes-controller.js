'use strict';

// import model and users controller
var Recipe = require('../models/recipe');
var usersController = require('../controllers/users-controller');

// initiate controller object
var recipesController = {};

// send API data
recipesController.sendApiRecipe = function (req, res) {
    res.json({
        message: 'recipe returned',
        recipe: res.locals.recipe
    });
};

// show all favorited recipes
recipesController.index = function (req, res, next) {
    Recipe.findByUser(req.user.id).then(function (recipe) {
        res.json({
            message: 'rendering favorites',
            data: { recipe: recipe }
        });
    }).catch(next);
};

// create favorite recipe
recipesController.create = function (req, res, next) {
    console.log(req.user.id, 'REQ.USER REQ.USER OOOOOOOOO');
    Recipe.create({
        title: req.body.title,
        diet: req.body.diet,
        calories: req.body.calories,
        servings: req.body.servings,
        health: req.body.health,
        ingredient: req.body.ingredient,
        img: req.body.img,
        link: req.body.link,
        user_id: req.user.id
    }).then(function (recipe) {
        res.json({
            message: 'favorite added',
            data: { recipe: recipe }
        });
    }).catch(next);
};

// delete favorite recipe
recipesController.delete = function (req, res, next) {
    Recipe.destroy(req.params.id).then(function () {
        res.json({
            message: 'successfully deleted recipe'
        });
    }).catch(next);
};

module.exports = recipesController;