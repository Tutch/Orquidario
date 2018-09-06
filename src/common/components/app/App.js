import React from 'react';
import Config from '../../config';

import { TopBar } from '../topBar/TopBar';
import { Sidebar } from '../sidebar/Sidebar'

// Router
import { HashRouter, Link, Route } from 'react-router-dom';

// Screens
import { MyCollection } from '../../../screens/myCollection/MyCollection';
import { OrchidEditor } from '../../../screens/orchidEditor/OrchidEditor';
import { Settings } from '../../../screens/settings/Settings';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTheme: Config.themes['Padrão'],
      currentThemeName: 'Padrão'
    };

    this.changeConfig = this.changeTheme.bind(this);
  }

  changeTheme(themeName) {
    let selected = Config.themes[themeName];
    this.setState({
      selectedTheme: selected,
      currentThemeName: themeName
    });
  }

  render() {
    return (
      <HashRouter>
        <div>
          <TopBar theme={this.state.selectedTheme}/>
          <main>
              <section className="container">
                <Route exact={true} 
                       path="/" 
                       render={(props) => <MyCollection theme={this.state.selectedTheme}  {...props}/>}/> 
                <Route path="/orchid-editor" 
                       render={(props) => <OrchidEditor theme={this.state.selectedTheme}  {...props}/>}/>
                <Route path="/settings" 
                       render={(props) => 
                        <Settings theme={this.state.selectedTheme} 
                                  currentThemeName={this.state.currentThemeName}
                                  themeList={Config.themes}
                                  changeTheme={this.changeConfig}
                                  {...props}/>}/>
              </section>
          </main>
          <Sidebar theme={this.state.selectedTheme}/>
        </div>
      </HashRouter>   
    );
  }
}