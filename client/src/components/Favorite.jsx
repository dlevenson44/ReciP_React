import React from 'react';

import FaveIngredientList from './FaveIngredientList';

const Favorite = (props) => {
    return (
        <div>
            <h3>{props.favorite.title} -- <a href={props.favorite.link}>See full recipe</a></h3>
            <p>{props.favorite.diet}</p>
            <p>{props.favorite.calories}</p>            
            <p>{props.favorite.health}</p>
            <button onClick={() => props.deleteFavorite(props.favorite.id)} className="favorite-submit">Delete Favorite</button>
            <div className="recipe-subcontainer">
            <div>
            <img src={props.favorite.img} />
            <p>{props.favorite.calories} calories per serving</p>
            <p>{props.favorite.servings} servings</p>                                    
            </div>
            <div>
            <FaveIngredientList ingredients={props.favorite.ingredient} />            
            </div>
            </div>
        </div>
    )
}

export default Favorite;
