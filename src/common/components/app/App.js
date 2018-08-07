import React from 'react';

// Router
import { HashRouter, Link, Route } from 'react-router-dom';

// Screens
import { Sidebar } from '../sidebar/Sidebar'
import { MyCollection } from '../../../screens/myCollection/MyCollection';
import { OrchidEditor } from '../../../screens/orchidEditor/orchidEditor';

export const App = (props) => {
  return (
    <HashRouter>
      <main>
          <section className="container">
            <Route exact={true} path="/" component={MyCollection} />     
            <Route path="/orchid-editor" component={OrchidEditor} />
          </section>
          <Sidebar />
      </main>
    </HashRouter>   
  );
}
