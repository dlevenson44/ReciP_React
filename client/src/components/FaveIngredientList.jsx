import React from 'react';

import FaveIngredient from './FaveIngredient';

const FaveIngredientList = (props) => {
    return (
        <div>
            {props.ingredients.map(ingredient => {
                return <FaveIngredient ingredient={ingredient} />
            })}
        </div>
    )
}

export default FaveIngredientList;