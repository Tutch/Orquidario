import '../assets/css/App.css';
import React from 'react';

// Router
import { HashRouter, Link, Route } from 'react-router-dom';

// Screens
import { NewOrchid } from '../screens/newOrchid/NewOrchid';
import { MyCollection } from '../screens/myCollection/MyCollection';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
            <Route exact={true} path="/" component={MyCollection} />        
            <Route path="/nova-orquidea" component={NewOrchid} />
        </div>
      </HashRouter>   
    );
  }
}

export default App;                 
