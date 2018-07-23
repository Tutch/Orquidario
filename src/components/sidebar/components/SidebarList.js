import React from 'react';

// Components
import { SidebarListItem } from './SidebarListItem';

export class SidebarList extends React.Component {
    render() {
        return (
            <>
                <SidebarListItem text="Minha Coleção" 
                                 icon="list"
                                 link="/"/>
                <SidebarListItem text="Inserir Nova Orquídea"
                                 icon="add" 
                                 link="/nova-orquidea"/>
            </>
        );
    }
}