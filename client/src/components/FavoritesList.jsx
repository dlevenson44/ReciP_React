import React, { Component } from 'react';

import Favorite from './Favorite';

class FavoritesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            favorites: []
        }
        this.fetchFavorites = this.fetchFavorites.bind(this)
    }

    componentWillMount() {
        this.fetchFavorites()
    }

    // fetch favorite recipes
    fetchFavorites() {
        console.log('fetched favorite')
        fetch('/api/recipes/favorites', {
            method: 'GET',
            credentials: 'include'
        }).then(res => res.json())
        .then(res => {
            this.setState({
                favorites: res.data.recipe
            })
        })
    }

    render() {
        if (this.state.favorites.length > 0) {
            return (
                <div>
                    {this.state.favorites.map(favorite => {
                        return <Favorite />
                    })}
                </div>
            )
        } else {
            return (
                <div>
                    <h3>No Favorites Added Yet</h3>
                </div>
            )
        }
    }
}

export default FavoritesList;
