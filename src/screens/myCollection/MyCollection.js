import React from 'react';

// Components
import { Collection } from './components/Collection';
import { ContentArea } from '../../common/components/contentArea/ContentArea';
import { OrchidEditor } from '../orchidEditor/orchidEditor';

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
            <ContentArea title="Minha Coleção">
                <Collection items={this.state.collection}/>
            </ContentArea>
        );
    }
}