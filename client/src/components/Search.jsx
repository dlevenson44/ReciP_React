import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <div>
                <form id="request">
                    <input type="text" id="search-field" name="search" placeholder="Search Recipes" />
                    <input type="submit" value="Search" />
                </form>
            </div>
        )
    }
}

export default Search;