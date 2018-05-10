// import model and users controller
const Recipe = require('../models/recipe');
const usersController = require('../controllers/users-controller');

// initiate controller object
const recipesController = {}

// send API data
recipesController.sendApiRecipe = (req, res) => {
    res.json({
        message: `recipe returned`,
        recipe: res.locals.recipe,
    })
}

// show all favorited recipes
recipesController.index = (req, res, next) => {
    Recipe.findByUser(req.user.id)
    .then(recipe => {
        res.json({
            message: 'rendering favorites',
            data: { recipe },
        })
    }).catch(next)
}

// create favorite recipe
recipesController.create = (req, res) => {
	console.log(req.body, 'from create/recipesController')
	Recipe.create({
		title: req.body.title,
		diet: req.body.diet,
		calories: req.body.calories,
		servings: req.body.servings,
		health: req.body.health,
		ingredient: req.body.ingredient,
		img: req.body.img,
		link: req.body.link,		
		user_id: req.user.id,
	}).then(recipe => {
		res.json({
            message: 'successfully added',
            data: { recipe }
        })
	}).catch(err => {
		console.log(err)
		res.status(500).json({error: err})
	})
}

// delete favorite recipe
recipesController.delete = (req, res, next) => {
    Recipe.destroy(req.params.id)
    .then(() => {
        res.json({
            message: 'successfully deleted recipe',
        })
    }).catch(next)
}

module.exports = recipesController;