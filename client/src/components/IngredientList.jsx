import React from 'react';

const IngredientList = (props) => {
    return (
        <div>
            {props.ingredients.map(ingredient => {
                return <p>Ingredient!</p>
            })}
        </div>
    )
}

export default IngredientList;
