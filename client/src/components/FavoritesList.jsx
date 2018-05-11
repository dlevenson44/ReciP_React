import React, { Component } from 'react';

class FavoritesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            favorites: {}
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
                favorites: res
            })
        })
    }

    render() {
        // this.fetchFavorites()
        return (
            <div>
                <p>FavoritesList Component</p>
            </div>
        )
    }
}

export default FavoritesList;
