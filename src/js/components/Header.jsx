'use strict';

import React, { PropTypes } from 'react';                   //React
import Reflux from 'reflux';                                //Reflux
import { Navbar, Nav, NavItem } from 'react-bootstrap';     //React-Bootstrap
import UserStore from '../stores/UserStore';             //UserStore
import { Link, Navigation } from 'react-router';                          //React-router

const Header = React.createClass({
  contextTypes : {
    history : PropTypes.object,
    location : PropTypes.object
  },
  mixins : [
    Navigation,
    Reflux.listenTo(UserStore, "updateUserState") //listenTo를 통해 trigger된 데이터 변경
  ],
  /**
   * 초기 state값 받아오기
   * @returns {*}
   */
  getInitialState() {
    var userInfo = UserStore.get();

    return {
      userInfo : userInfo
    };
  },
  /**
   *  user state를 업데이트 한다.
   */
  updateUserState() {
    var userInfo = UserStore.get();
    this.setState({userInfo : userInfo});
  },
  /**
   * move to page
   * @param url
   */
  handleClick(url) {
    //console.log(url);
    this.context.history.pushState(null, url);
  },
  /**
   * rendering markup
   * @returns {XML}
   */
  render() {
    const { userInfo } = this.state;
    var nav_menu;
    var currentPath = this.context.location.pathname;

    console.log(currentPath);

    if (JSON.stringify(userInfo) == "{}") {
      nav_menu = [];
    } else {
      nav_menu = [
        //<NavItem key="1" className={ currentPath=='/login'?'active':'' } onClick={this.handleClick.bind(null, '/login')}>Login</NavItem>,
        //<NavItem key="2" className={ currentPath=='/dashboard'?'active':'' } onClick={this.handleClick.bind(null, '/dashboard')}>Dashboard</NavItem>,
        //<NavItem key="3" className={ currentPath=='/test'?'active':'' } onClick={this.handleClick.bind(null, '/test')}>Test</NavItem>,
        <NavItem key="4" className={ currentPath=='/websocket'?'active':'' } onClick={this.handleClick.bind(null, '/websocket')}>WebsocketTest</NavItem>,
        <NavItem key="5" className={ currentPath=='/lists'?'active':'' } onClick={this.handleClick.bind(null, '/lists')}>List</NavItem>
      ];
    }

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Websocket Test page</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          { nav_menu }
        </Nav>
      </Navbar>
    );
  }
});

export default Header;