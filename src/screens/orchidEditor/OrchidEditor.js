import React from 'react';
import withRouter from 'react-router-dom';

// Components
import { ContentArea } from '../../common/components/contentArea/ContentArea';
import { OrchidForm } from './components/OrchidForm';

const electron = window.require('electron');
const {dialog} = window.require('electron').remote;
const request = window.require('request');
const ipcRenderer  = electron.ipcRenderer;

let state = { 
    id: '',
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
        const subfamilies = ipcRenderer.sendSync('get-orchid-subfamilies');

        if(subfamilies) {
            this.populateSubfamilies(subfamilies);
            this.setState({
                chosenSubfamily: subfamilies[0]
            });        
        } else {
           // não deu bom
        }

        this.formFields = {
            description: ''
        }

        if(this.props.location.customProp) {
            this.formFields = this.props.location.customProp.item;
            
            this.setState({
                chosenSubfamily: this.formFields.subfamily,
                id: this.formFields._id,
                files: this.formFields.pictures
            });
        }
    }

    componentWillUnmount() {
        state = this.state;
        state.files = [];
        state.id = '';
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
                let receivedPaths = filePaths != undefined ? filePaths : [];
                let newPaths = new Set(this.state.files);

                console.log(filePaths);

                receivedPaths.forEach(path => {
                    newPaths.add(path);
                });

                this.setState({
                    files: Array.from(newPaths)
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

        let orchid = { 
            description: this.state.description,
            subfamily: this.state.chosenSubfamily,
            pictures: this.state.files,
            timestamp: new Date().getTime()
        };

        if(this.state.id != '') {
            orchid['_id'] = this.state.id; 
        }

        if(ipcRenderer.sendSync('save-orchid', orchid)) {
            this.props.history.push('/');
        } else {
            // não deu bom
        }
    }

    render() {
        return (
            <ContentArea title="Inserir Nova Orquídea">
                <OrchidForm formFields={this.formFields}
                            subfamilies={this.state.subfamilies} 
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