import React from 'react';

const Ingredient = (props) => {
    return (
        <div>
            <p>{props.ingredient.text}</p>
        </div>
    )
}

export default Ingredient;
