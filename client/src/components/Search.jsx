import React, { Component } from 'react';

import RecipeList from './RecipeList'

class Search extends Component {
    constructor() {
        super()
        this.state = {
            results: {},
            search: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.searchRecipe = this.searchRecipe.bind(this);
        this.renderResults = this.renderResults.bind(this)
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })
    }

    searchRecipe(e, data) {
        e.preventDefault()
        console.log(data, 'is being searched')
        fetch(`/api/recipes/${data}`, {
            method: 'GET',
        }).then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({
                results: res.recipe.hits,
            })
        })
    }

    renderResults() {
        let results = this.state.results
        if (this.state.results.length > 0) {
            return <RecipeList />
        }
    }

    render() {
        return (
            <div>
                <form id="request" onSubmit={(e) => this.searchRecipe(e, this.state.search)}>
                    <input type="text" id="search-field" name="search" placeholder="Search Recipes" value={this.state.search} onChange={this.handleInputChange} />
                    <input type="submit" value="Search" />
                </form>
                {this.renderResults()}
            </div>
        )
    }
}

export default Search;