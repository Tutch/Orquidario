import React from 'react';

// Router
import { Link } from 'react-router-dom';

export class SidebarListItem extends React.Component {
    render() {
        return (
            <li className="bold">
                <Link className="grey-text text-lighten-5" 
                      to={this.props.link}>
                    <i className="grey-text text-lighten-5 material-icons left">
                        {this.props.icon}
                    </i>
                    {this.props.text}
                </Link>
            </li>
        );
    }
}