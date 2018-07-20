import React from 'react';

// Components
import { Sidebar } from '../../common/components/sidebar/Sidebar';
import { ContentArea } from '../../common/components/contentArea/ContentArea';
import { NewOrchidForm } from './components/NewOrchidForm';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

let state = { 
    description:'',
    subfamilies:[], 
    chosenSubfamily:''
};

export class NewOrchid extends React.Component {
    constructor(props) {
        super(props);
        this.state = state;
        this.populateSubfamilies = this.populateSubfamilies.bind(this);
        this.chooseSubfamily = this.chooseSubfamily.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.saveOrchid = this.saveOrchid.bind(this);
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
    }

    populateSubfamilies(args) {
        this.setState({
            subfamilies: args
        });
    }

    chooseSubfamily(e) {
        const subfamily = e.target.value;

        this.setState({
            chosenSubfamily: subfamily
        })
    }

    setDescription(e) {
        const newDescription = e.target.value;

        this.setState({
            description: newDescription
        })
    }

    saveOrchid(e) {
        e.preventDefault();
        
        const orchid = { 
            description: this.state.description,
            subfamily: this.state.chosenSubfamily,
        };

        if(ipcRenderer.sendSync('save-orchid', orchid)) {
            // deu bom
        } else {
           // não deu bom
        }
    }

    render() {
        return (
            <div>
                <Sidebar />                
                <ContentArea title="Inserir Nova Orquídea">
                    <NewOrchidForm subfamilies={this.state.subfamilies} 
                                   setSubfamily={this.chooseSubfamily}
                                   setDescription={this.setDescription}
                                   saveOrchid={this.saveOrchid} />
                </ContentArea>
            </div>
        );
    }
}