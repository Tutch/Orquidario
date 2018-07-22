import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div');
root.id = "root";
document.body.appendChild( root );

// Materialize
//document.body.appendChild('<script type="text/javascript" src="js/hammer.min.js"></script>');
//document.body.appendChild('<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>');


// Now we can render our application into it
render( <App />, document.getElementById('root') );
