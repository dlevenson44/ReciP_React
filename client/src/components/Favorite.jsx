import React from 'react';

import FaveIngredientList from './FaveIngredientList';

const Favorite = (props) => {
    return (
        <div>
            <p>{props.favorite.calories}</p>
            <p>{props.favorite.diet}</p>
            <p>{props.favorite.health}</p>
            <p>{props.favorite.servings}</p>
            <p>{props.favorite.title}</p>
            <img src={props.favorite.img} />
            <a href={props.favorite.link}>See full recipe</a>
            <FaveIngredientList ingredients={props.favorite.ingredient} />
            <button onClick={() => props.deleteFavorite(props.favorite.id)}>Delete Favorite</button>
        </div>
    )
}

export default Favorite;
