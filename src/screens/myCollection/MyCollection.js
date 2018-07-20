import React from 'react';

// Components
import { Collection } from './components/Collection';
import { Sidebar } from '../../common/components/sidebar/Sidebar';
import { ContentArea } from '../../common/components/contentArea/ContentArea';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

export class MyCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const loadedCollection = ipcRenderer.sendSync('load-collection');
        this.setState({
            collection: loadedCollection
        })
    }

    render() {
        return (
            <div>
                <Sidebar />
                <ContentArea title="Minha Coleção">
                    <Collection items={this.state.collection}/>
                </ContentArea>
            </div>
        );
    }
}