import React from 'react';
import { Link } from 'react-router-dom';

export const TopBar = (props) => {
    let theme = props.theme;

    return (
        <nav className={'hide-on-large-only z-depth-0 ' + theme.mainColor}>
            <div className="nav-wrapper">
                <Link to="#" 
                   data-activates="main-menu" 
                   className="button-collapse hide-on-large-only">
                    <i className="material-icons">menu</i>
                </Link>
            </div>
        </nav>
    );
}
