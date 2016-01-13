/**
 *  React js Router
 *
 *  ver : 0.0.1
 *  Note :
 *    -React js 활용한 Router
 */
'use strict';

import React from 'react';
import Router,{ Route, Redirect, IndexRoute } from 'react-router';
import requireAuth from './utils/requireAuth';

//page module
import App from './App.jsx';
import Login from './views/Login.jsx';
import Dashboard from './views/Dashboard.jsx';
import Test from './views/Test.jsx';
import WebsocketTest from './views/WebsocketTest.jsx';
import Lists from './views/Lists.jsx';

export default (
  <Router>
        <Route component={ App }>
              <Route path="/login" name="login" component={ Login } />
              <Route path="/dashboard" name="dashboard" component={ Dashboard }/>
              <Route path="/websocket" name="websocket" component={ WebsocketTest } onEnter={ requireAuth }/>
              <Route path="/lists" name="listTest" component={ Lists } onEnter={ requireAuth }/>

              <Redirect from="/" to="/login"/>
        </Route>
  </Router>
);


//<Route path="/" handler={ App }>
//      <IndexRoute component={ Login } />
//      <Route path="login" name="login" handler={ Login } />
//      <Route path="dashboard" name="dashboard" handler={ Dashboard }/>
//      <Route path="websocket" name="websocket" handler={ WebsocketTest } onEnter={ requireAuth }/>
//      <Route path="lists" name="listTest" handler={ Lists } onEnter={ requireAuth }/>
//</Route>