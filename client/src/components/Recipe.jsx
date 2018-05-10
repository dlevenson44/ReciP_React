import React from 'react';
import IngredientList from './IngredientList';

const Recipe = (props) => {
    const calPerServing = (props.recipe.calories / props.recipe.yield).toPrecision(6)
    console.log(props.recipe)
    return (
        <div>
            <h3>{props.recipe.label}</h3>
            <div>
            <img src={props.recipe.image} />
            <a href={props.recipe.url}>View Full Recipe</a>
            <p>{props.recipe.dietLabels[0]}</p>
            </div>
            <div>
            <p>{calPerServing} calories per serving</p>            
            <p>{props.recipe.yield} servings</p>
            <IngredientList ingredients={props.recipe.ingredients} />
            </div>
        </div>
    )
}

export default Recipe;
