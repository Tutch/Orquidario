import React from 'react';
import Config from '../../common/config';

// Components
import { ContentArea } from '../../common/components/contentArea/ContentArea';
import { SettingsForm } from './components/SettingsForm.js';

export class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.themeList = ['Padrão','Noturno']; // hardcoded por enquanto
        this.selectedTheme = this.themeList[0];
        this.setTheme = this.setTheme.bind(this);
        
    }

    setTheme(event) {
        const newTheme = event.target.value;
        
        this.setState({
            selectedTheme: newTheme
        });
    }

    render() {
        return (
            <ContentArea title="Configurações">
                <SettingsForm themeList={this.themeList} 
                              setTheme={this.setTheme}/>
            </ContentArea>
        );
    }
}