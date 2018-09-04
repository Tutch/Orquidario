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

export const App = (props) => {

  return (
    <HashRouter>
      <div>
        <TopBar />
        <main>
            <section className="container">
              <Route exact={true} path="/" 
                     render={(props) => <MyCollection config={Config}  {...props}/>}/> 
              <Route path="/orchid-editor" 
                     render={(props) => <OrchidEditor config={Config}  {...props}/>}/>
              <Route path="/settings" 
                     component={Settings}/>
            </section>
            <Sidebar config={Config}/>
        </main>
      </div>
    </HashRouter>   
  );
}
