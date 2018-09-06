import React from 'react';
import PropTypes from 'prop-types';

// Components
import { ContentArea } from '../../common/components/contentArea/ContentArea';
import { SettingsForm } from './components/SettingsForm.js';

export class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.themeList = Object.keys(props.themeList);
        this.setTheme = this.setTheme.bind(this);

        this.state = {
            currentThemeName: props.currentThemeName
        }
    }

    setTheme(event) {
        const newTheme = event.target.value;
        this.props.changeTheme(newTheme);

        this.setState({
            currentThemeName: newTheme
        });
    }

    render() {
        return (
            <ContentArea title="Configurações">
                <SettingsForm themeList={this.themeList} 
                              currentThemeName={this.state.currentThemeName}
                              setTheme={this.setTheme}/>
            </ContentArea>
        );
    }
}

Settings.propTypes = {
    currentThemeName: PropTypes.string,
    theme: PropTypes.object,
    changeTheme: PropTypes.func
}