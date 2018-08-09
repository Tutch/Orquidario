import React from 'react';
import { TopBar } from '../topBar/TopBar';
import { Sidebar } from '../sidebar/Sidebar'

// Router
import { HashRouter, Link, Route } from 'react-router-dom';

// Screens
import { MyCollection } from '../../../screens/myCollection/MyCollection';
import { OrchidEditor } from '../../../screens/orchidEditor/OrchidEditor';

export const App = (props) => {
  return (
    <HashRouter>
      <div>
        <TopBar />
        <main>
            <section className="container">
              <Route exact={true} path="/" component={MyCollection} />     
              <Route path="/orchid-editor" component={OrchidEditor} />
            </section>
            <Sidebar />
        </main>
      </div>
    </HashRouter>   
  );
}
