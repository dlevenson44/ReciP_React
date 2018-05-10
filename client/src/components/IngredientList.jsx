import React from 'react';
import Ingredient from './Ingredient';

const IngredientList = (props) => {
    return (
        <div>
            {props.ingredients.map(ingredient => {
                return <Ingredient ingredient={ingredient}/>
            })}
        </div>
    )
}

export default IngredientList;
