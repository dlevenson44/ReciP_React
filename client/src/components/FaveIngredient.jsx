import React from 'react';

const FaveIngredient = (props) => {    
    let array = JSON.parse(props.ingredient)
    return (
        <div>
        <p>{array.text}</p>
        </div>
    )
}

export default FaveIngredient;
