import React from 'react';

const Header = (props) => {
    return (
        <div>
            <h1 className="mainheader">{props.header}</h1>
        </div>
    )
}

export default Header;
