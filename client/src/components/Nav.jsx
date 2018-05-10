import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
    return (
        <div>
        {props.auth ? (
            <div>
            <ul>
                <li><Link to = '/'>Home</Link></li>
                <li><Link to = '/favorites'>Favorites</Link></li>
                <li><Link to = '/' onClick={props.logout}>Logout</Link></li>
            </ul>
            </div>
        ) : (
            <div>
            <ul>
                <li><Link to = '/'>Home</Link></li>
                <li><Link to = '/register'>Register</Link></li>
                <li><Link to = '/login'>Login</Link></li>
            </ul>
            </div>
        )}
        </div>
    )
}

export default Nav;
