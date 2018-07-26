import React from 'react';
import Config from '../../config';

// Components
import { SidebarList } from './components/SidebarList';

export class Sidebar extends React.Component {
    componentDidMount() {
        $('.button-collapse').sideNav({
            menuWidth: 300,
            closeOnClick: true
        });
    }
    
    render() {
        return (
            <>
                <ul id="main-menu" 
                    className={'side-nav fixed z-depth-4 ' + Config.mainColor}>
                    <SidebarList />
                </ul>
                <a href="#" 
                   data-activates="main-menu" 
                   className="button-collapse hide-on-large-only">
                    <i className="material-icons">menu</i>
                </a>
            </>
        );
    }
}
