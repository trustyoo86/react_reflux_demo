'use strict';

import Reflux from 'reflux';
import Im from 'immutable';
import UserActions from '../actions/UserActions';
import { requestGet, requestPost } from '../utils/Connection';

const UserStore = Reflux.createStore({
  listenables : UserActions,
  init() {
    this._user = {};
  },
  clearUserInfo() {
    this._user = {};
    this.trigger();
  },
  /**
   * app 전체 내의 user Info 저장
   * @param userInfo
   */
  setUserInfo(userInfo) {
    this._user = userInfo;
    this.trigger();
  },
  /**
   * user 정보 저장
   * @param userInfo
   */
  set(userInfo) {
    this._user = userInfo;
  },
  /**
   * get User info
   * @param id
   */
  get() {
    return this._user;
  },
  /**
   * login completed function
   * @param response
   */
  onLoginCompleted(response) {
    console.log(response.body);
  },
  /**
   * Server 에러일 경우 function
   * @param response
   */
  onLoginFailed(response) {
    console.log(response);
  },
  /**
   *  로그인 여부 파악
   */
  isSignin() {
    var isLoggedIn = false;       //Login 여부
    if (JSON.stringify(this._user) != "{}") {
      isLoggedIn = true;
    }

    return isLoggedIn;
  }
});

export default UserStore;
