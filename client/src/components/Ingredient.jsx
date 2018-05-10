import React from 'react';

const Ingredient = (props) => {
    console.log(props)
    return (
        <div>
            <p>{props.ingredient.text}</p>
        </div>
    )
}

export default Ingredient;
