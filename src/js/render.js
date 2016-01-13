'use strict';

import '../scss/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes.jsx';
import Router from 'react-router';

import App from './App.jsx';

//Router.run(routes, Router.HashLoaction, (Handler, state) => {
//  ReactDOM.render(
//    <Handler />
//    , document.getElementById('app'));
//});
ReactDOM.render(routes, document.getElementById('app'));
