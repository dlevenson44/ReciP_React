import React, { Component } from 'react';
import IngredientList from './IngredientList';

class Recipe extends Component {
    render () {
        const calPerServing = (this.props.recipe.calories / this.props.recipe.yield).toPrecision(6)
        console.log(this)        
        return (
            <div>
                <h3>{this.props.recipe.label} -- <a href={this.props.recipe.url}>Full Recipe</a></h3>
                <p>{this.props.recipe.dietLabels[0]}</p>
                <div className="recipe-container">
                <div>
                <img src={this.props.recipe.image} />
                <p>{this.props.recipe.dietLabels[0]}</p>
                <p>{calPerServing} calories per serving</p>            
                <p>{this.props.recipe.yield} servings</p>
                </div>
                <div>
                <IngredientList ingredients={this.props.recipe.ingredients} />
                </div>
                </div>
            </div>
        )
    }
}

export default Recipe;
