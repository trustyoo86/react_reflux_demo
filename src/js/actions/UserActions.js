'use strict';

import Reflux from 'reflux';
import { requestGet, requestPost } from '../utils/Connection';
import $ from 'jquery';
import request from 'superagent';
import { apiPath } from '../constants/appSettings';

const UserActions = Reflux.createActions({
  'login' : { asyncResult : true }      //flux asyncResult를 통한 complete 및 failed resource 정의
});

UserActions.login.preEmit = (loginData, callback) => {
  var options = {
    url : '/api/user/signin',
    data : loginData
};

  /**
   *  REST api request
   */
  requestPost(options, callback)
    .then(callback)
    .catch(UserActions.login.failed);
};

export default UserActions;