import React from 'react';

import Recipe from './Recipe';

const RecipeList = (props) => {
    return (
        <div>
            {props.results.map(recipe => {
                return <Recipe key={recipe.id} recipe={recipe} />
            })}
        </div>
    )
}

export default RecipeList;
