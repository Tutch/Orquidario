import React from 'react';

// Router
import { Link } from 'react-router-dom';

export const SidebarListItem = (props) => {
    return (
        <li className="bold">
            <Link className="grey-text text-lighten-5" 
                    to={props.link}>
                <i className="grey-text text-lighten-5 material-icons left">
                    {props.icon}
                </i>
                {props.text}
            </Link>
        </li>
    );
}