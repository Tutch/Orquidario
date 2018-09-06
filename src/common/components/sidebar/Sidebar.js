import React from 'react';

// Components
import { SidebarList } from './components/SidebarList';

export class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            theme: props.theme
        }
    }
    
    componentWillReceiveProps(newProps) {
        this.setState({ 
            theme: newProps.theme 
        });  
    }

    componentDidMount() {
        $('.button-collapse').sideNav({
            menuWidth: 300,
            closeOnClick: true
        })
    }
    
    render() {
        return (
            <>
                <ul id="main-menu" 
                    className={'side-nav fixed z-depth-4 ' + this.state.theme.mainColor}>
                    <SidebarList />
                </ul>
            </>
        );
    }
}
