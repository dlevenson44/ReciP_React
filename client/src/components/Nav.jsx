import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
    return (
        <div className="nav-container">
        {props.auth ? (
            <div>
            <ul className="nav-list">
                <li><Link to = '/'>Home</Link></li>
                <li><Link to = '/favorites'>Favorites</Link></li>
                <li><Link to = '/' onClick={props.logout}>Logout</Link></li>
            </ul>
            </div>
        ) : (
            <div>
            <ul className="nav-list">
                <li><Link to = '/' className="nav-link">Home</Link></li>
                <li><Link to = '/register' className="nav-link">Register</Link></li>
                <li><Link to = '/login' className="nav-link">Login</Link></li>
            </ul>
            </div>
        )}
        </div>
    )
}

export default Nav;
