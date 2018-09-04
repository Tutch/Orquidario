import React from 'react';

// Components
import { SidebarList } from './components/SidebarList';

export class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.config = this.props.config;
    }
    
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
                    className={'side-nav fixed z-depth-4 ' + this.config.mainColor}>
                    <SidebarList />
                </ul>
            </>
        );
    }
}
