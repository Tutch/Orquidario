import React from 'react';

// Router
import { HashRouter, Link, Route } from 'react-router-dom';

// Screens
import { Sidebar } from '../sidebar/Sidebar'
import { NewOrchid } from '../../../screens/newOrchid/NewOrchid';
import { MyCollection } from '../../../screens/myCollection/MyCollection';

export const App = (props) => {
  return (
    <HashRouter>
      <main>
          <section className="container">
            <Route exact={true} path="/" component={MyCollection} />     
            <Route path="/nova-orquidea" component={NewOrchid} />
          </section>
          <Sidebar />
      </main>
    </HashRouter>   
  );
}
