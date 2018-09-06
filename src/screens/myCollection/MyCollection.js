import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Collection } from './components/Collection';
import { ContentArea } from '../../common/components/contentArea/ContentArea';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

export class MyCollection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.theme = props.theme;
        this.removeOrchid = this.removeOrchid.bind(this);
    }

    loadOrchids() {
        return ipcRenderer.sendSync('load-collection');
    }

    componentWillMount() {
        const loadedCollection = this.loadOrchids();
        this.setState({
            collection: loadedCollection
        })
    }

    // infoObj contains two keys: id and pictures, corresponding to the orchid
    // id and a list of its pictures (paths)
    removeOrchid(infoObj, event) {
        if(ipcRenderer.sendSync('remove-orchid', infoObj)) {
            this.setState({
                collection: this.loadOrchids()
            })
        } else {
            // não deu bom
        }
    }

    render() {
        return (
            <ContentArea title="Minha Coleção">
                <Collection theme={this.theme}
                            items={this.state.collection} 
                            removeOrchid={this.removeOrchid}/>
            </ContentArea>
        );
    }
}

MyCollection.propTypes = {
    theme: PropTypes.object
}