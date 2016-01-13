'use strict';

import React, { PropTypes } from 'react';                         //React
import { Panel, Input, ButtonInput } from 'react-bootstrap';      //React-bootstrap
import Reflux from 'reflux';                                      //Reflux
import UserActions from '../actions/UserActions';              //UserActions
import UserStore from '../stores/UserStore';                   //UserStore
import { Navigation } from 'react-router';                        //React-Router

const Login = React.createClass({
  /**
   *  Context Type 지정
   */
  contextTypes : {
    history : PropTypes.object,
    location : PropTypes.object
  },
  /**
   * 초기 프로퍼티
   */
  propTypes : {
    user : PropTypes.object,
    errorMessage : PropTypes.string
  },
  /**
   * 초기 property 설정
   */
  getInitialState() {
    return {
      submitted : false,        //isSubmit
      email : '',
      password : '',
      isEmailValid : null,      //email validation
      isPasswordValid : null    //password validation
    };
  },
  /**
   *  Component가 마운트 될때의 function
   */
  componentWillMount () {
    UserStore.clearUserInfo();
  },
  /**
   * login
   */
  login(e) {
    e.preventDefault();
    const { email, password } = this.state;

    this.setState({
      submitted : true
    });

    /**
     *  Login post Action
     */
    UserActions.login({
      email : email,
      password : password
    }, (response) => {
      this.loginCompleted(response);
    });
  },
  /**
   * login Completed
   * @param res
   */
  loginCompleted(res) {
    console.log(res.body);
    var loginResult = res.body;
    let self = this;

    if (loginResult.status === 'success') {

      this.saveUserInfo(loginResult.data, () => {
        self.context.history.pushState(null, '/websocket');
      });
    } else {

    }
  },
  /**
   * app 전체내에 user info를 저장
   * @param userInfo
   * @param cbFunc
   */
  saveUserInfo(userInfo, cbFunc) {
    UserStore.setUserInfo(userInfo);

    typeof cbFunc == "function" && cbFunc();
  },
  /**
   * email & password validation
   * @param value
   * @param target
   */
  validation(value, target) {
    switch(target) {
      case "email" :
        let emailRegex = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
        this.setState({email : value});
        if (value.match(emailRegex)) {
          this.setState({isEmailValid : 'success'});  //success
        } else {
          this.setState({isEmailValid : 'error'});    //error
        }
        break;
      case "password" :
        console.log('password');
        this.setState({password : value});
        if (value.length < 5) {
          this.setState({isPasswordValid : 'error'});
        } else {
          this.setState({isPasswordValid : 'success'});
        }
        break;
    }

    if(this.state.isEmailValid === 'success' && this.state.isPasswordValid === 'success') {
      this.setState({submitted : true});
    } else {
      this.setState({submitted : false});
    }
  },
  /**
   * render
   * @returns {XML}
   */
  render() {
    const { submitted, email, password, isEmailValid, isPasswordValid } = this.state;

    return (
      <div className="login_div">
        <Panel header="로그인" bsStyle="primary">
          <form onSubmit={ this.login }>
            <Input type="email"
                   placeholder="이메일 입력"
                   id="email"
                   value={ email }
                   bsStyle={ isEmailValid }
                   onChange={ (e) => this.validation(e.target.value, 'email')} hasFeedback/>
            <Input type="password"
                   placeholder="Password"
                   id="password"
                   value={ password }
                   bsStyle={ isPasswordValid }
                   onChange={ (e) => this.validation(e.target.value, 'password') } hasFeedback/>
            <ButtonInput type="submit"
                         bsStyle="primary"
                         disabled={ !submitted }>
              Sign in
            </ButtonInput>
          </form>
        </Panel>
      </div>
    );
  }
});

export default Login;