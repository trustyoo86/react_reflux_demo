'use strict';

import React, { PropTypes } from 'react';
import Reflux from 'reflux';
//import Router,{ Link, RouteHandler } from 'react-router';
import Router from 'react-router';

import Header from './components/Header.jsx';
import Login from './views/Login.jsx';


const App = React.createClass({
  propTypes : {
    children : PropTypes.object
  },

  render() {
    return (
      <div>
        <Header />
        <div className="page_container">
          { this.props.children }
        </div>
      </div>
    );
  }
});

export default App;
//<RouteHandler {...this.props}/>

//<div>
//  <Header />
//  <div className="page_container">
//    <RouteHandler {...this.props}/>
//  </div>
//</div>