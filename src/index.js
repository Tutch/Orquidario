import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Router
import { BrowserRouter, Link, Route } from 'react-router-dom';

// Screens
import { NewOrchid } from './screens/newOrchid/NewOrchid';
import { MyCollection } from './screens/myCollection/MyCollection';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact={true} path="/" component={MyCollection} />        
            <Route path="/nova-orquidea" component={NewOrchid} />        
        </div>
    </BrowserRouter>,     
    document.getElementById('root')
);

registerServiceWorker();
