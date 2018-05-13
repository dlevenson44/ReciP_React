import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Favorite from './Favorite';

class FavoritesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            favorites: [],
            fireRedirect: false,
            redirectPath: null
        }
        this.deleteFavorite = this.deleteFavorite.bind(this)
        this.fetchFavorites = this.fetchFavorites.bind(this)
    }

    componentWillMount() {
        this.fetchFavorites()
    }

    // delee favorite recipe
    deleteFavorite(id) {
        fetch(`/api/recipes/favorites/${id}`, {
            method: 'DELETE',
        }).then(res => res.json())
        .then(res => {
            this.setState({
                fireRedirect: true,
                redirectPath: '/favorites'
            })
        }).catch(err => console.log(err))
    }

    // fetch favorite recipes
    fetchFavorites() {        
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
                        return <Favorite favorite={favorite} key={favorite.id} />
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
