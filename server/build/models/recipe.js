'use strict';

// import config file
var db = require('../db/config');

// initiate recipe object
var Recipe = {};

// find all favorite recipes per specific user
Recipe.findByUser = function (userid) {
	return db.query('SELECT * FROM favoriterecipes WHERE user_id = $1', [userid]);
};

// find specific recipe
Recipe.findById = function (id) {
	return db.one('\n\t\tSELECT * FROM favoriterecipes\n\t\tWHERE user_id = $1\n\t\t', [id]);
};

// create recipe
Recipe.create = function (recipe, userid) {
	return db.one('\n\t\tINSERT INTO favoriterecipes\n\t\t(title, diet, calories, servings, health, ingredient, link, img, user_id)\n\t\tVALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)\n\t\tRETURNING *\n\t\t', [recipe.title, recipe.diet, recipe.calories, recipe.servings, recipe.health, recipe.ingredient, recipe.link, recipe.img, recipe.user_id, userid]);
};

// delete recipe
Recipe.destroy = function (id) {
	return db.none('\n\t\tDELETE FROM favoriterecipes\n\t\tWHERE id = $1\n\t\t', [id]);
};

// export recipe model
module.exports = Recipe;