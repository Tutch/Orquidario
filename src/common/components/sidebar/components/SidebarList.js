import React from 'react';

// Router
import { Link } from 'react-router-dom';

// Components
import { SidebarListItem } from './SidebarListItem';

export class SidebarList extends React.Component {
    render() {
        return (
            <ul>
                <Link to="/">
                 <SidebarListItem text="Minha Coleção"/>
                </Link>
                <Link to="/nova-orquidea">
                    <SidebarListItem text="Inserir Nova Orquídea"/>
                </Link>
            </ul>
        );
    }
}