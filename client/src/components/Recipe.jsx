import React from 'react';
import IngredientList from './IngredientList';

const Recipe = (props) => {
    const calPerServing = (props.recipe.calories / props.recipe.yield).toPrecision(6)
    console.log(props.recipe)
    return (
        <div>
            <h3>{props.recipe.label} -- <a href={props.recipe.url}>Full Recipe</a></h3>
            <p>{props.recipe.dietLabels[0]}</p>
            <div className="recipe-container">
            <div>
            <img src={props.recipe.image} />
            <p>{props.recipe.dietLabels[0]}</p>
            <p>{calPerServing} calories per serving</p>            
            <p>{props.recipe.yield} servings</p>
            </div>
            <div>
            <IngredientList ingredients={props.recipe.ingredients} />
            </div>
            </div>
        </div>
    )
}

export default Recipe;
