import React from 'react';
import withRouter from 'react-router-dom';

// Components
import { ContentArea } from '../../common/components/contentArea/ContentArea';
import { OrchidForm } from './components/orchidForm';

const electron = window.require('electron');
const {dialog} = window.require('electron').remote;
const request = window.require('request');
const ipcRenderer  = electron.ipcRenderer;

let state = { 
    description:'',
    subfamilies:[], 
    chosenSubfamily:'',
    files: []
};

export class OrchidEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = state;
        this.populateSubfamilies = this.populateSubfamilies.bind(this);
        this.chooseSubfamily = this.chooseSubfamily.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.saveOrchid = this.saveOrchid.bind(this);
        this.selectPictures = this.selectPictures.bind(this);
        this.removePicture = this.removePicture.bind(this);
    }
    
    componentWillMount() {
        ipcRenderer.send('get-orchid-subfamilies');
        ipcRenderer.on('got-orchid-subfamilies', (event, args) => {
            this.populateSubfamilies(args);
            this.setState({
                chosenSubfamily: args[0]
            });
        });
    }

    componentWillUnmount() {
        state = this.state;
        state.files = [];
    }

    populateSubfamilies(args) {
        this.setState({
            subfamilies: args
        });
    }

    chooseSubfamily(event) {
        const subfamily = event.target.value;

        this.setState({
            chosenSubfamily: subfamily
        })
    }

    setDescription(event) {
        const newDescription = event.target.value;

        this.setState({
            description: newDescription
        })
    }

    selectPictures(event) {
        event.preventDefault();
        dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'], 
                filters: [
                    {name: 'Images', extensions: ['jpg', 'png', 'gif']},
            ]} , (filePaths) => {
                this.setState({
                    files: filePaths
                })
        });
    }

    // Removes picture from the list of pictures
    removePicture(param, event) {
        event.preventDefault();
        this.setState({
            files: this.state.files.filter(item => item !== param.path)
        })
    };

    saveOrchid(event) {
        event.preventDefault();
        
        const orchid = { 
            description: this.state.description,
            subfamily: this.state.chosenSubfamily,
            pictures: this.state.files,
            timestamp: new Date().getTime()
        };

        if(ipcRenderer.sendSync('save-orchid', orchid)) {
            this.props.history.push('/');
        } else {
           // não deu bom
        }
    }

    render() {
        return (
            <ContentArea title="Inserir Nova Orquídea">
                <OrchidForm subfamilies={this.state.subfamilies} 
                            setSubfamily={this.chooseSubfamily}
                            setDescription={this.setDescription}
                            selectPictures={this.selectPictures}
                            saveOrchid={this.saveOrchid}
                            removePicture={this.removePicture}
                            files={this.state.files} />
            </ContentArea>
        );
    }
}