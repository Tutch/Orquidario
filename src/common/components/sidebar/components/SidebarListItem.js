import React from 'react';

export class SidebarListItem extends React.Component {
    render() {
        return (
            <li>{this.props.text}</li>
        );
    }
}