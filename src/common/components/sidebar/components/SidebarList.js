import React from 'react';

// Components
import { SidebarListItem } from './SidebarListItem';

export const SidebarList = (props) => {
    return (
        <>
            <SidebarListItem text="Minha Coleção" 
                                icon="list"
                                link="/"
                                custom=""/>
            <SidebarListItem text="Inserir Nova Orquídea"
                                icon="add" 
                                link="/orchid-editor"
                                custom=""/>
            <SidebarListItem text="Configurações"
                                icon="settings"
                                link='/settings'
                                custom=""/>
        </>
    );
}