import React, { Component } from 'react';
import IngredientList from './IngredientList';

class Recipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.recipe.label,
            diet: this.props.recipe.dietLabels[0],
            calories: 0,
            servings: this.props.recipe.yield,
            health: this.props.recipe.healthLabels[0],
            ingredient: this.props.recipe.ingredients,
            link: this.props.recipe.url,
            img: this.props.recipe.image
        }
        this.renderButton = this.renderButton.bind(this);
    }

    componentWillMount() {
        const calPerServing = (this.props.recipe.calories / this.props.recipe.yield).toPrecision(6)
        this.setState({
            calories: calPerServing
        })
    }
    
    addFavorite (e, data) {
        e.preventDefault()
        console.log('adding favorite')
        fetch('/api/recipes/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(res => {
            this.setState({
                fireRedirect: true,
                redirectPath: '/favorites'
            })
        }).catch(err => console.log(err))
    }

    renderButton() {
        if (this.props.auth === true) {
            return (
                <div>
                    <form onSubmit={(e) => this.addFavorite()}>
                    </form>
                </div>
            )
        }
    }

    render () {                
        return (
            <div>
                <h3>{this.props.recipe.label} -- <a href={this.props.recipe.url}>Full Recipe</a></h3>
                <p>{this.props.recipe.dietLabels[0]}</p>
                <p>{this.props.recipe.healthLabels[0]}</p>
                <div className="recipe-container">
                <div>
                <img src={this.props.recipe.image} />
                <p>{this.props.recipe.dietLabels[0]}</p>
                <p>{this.state.calories} calories per serving</p>            
                <p>{this.props.recipe.yield} servings</p>
                {this.renderButton()}
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
