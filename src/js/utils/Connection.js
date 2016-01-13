/**
 *  React REST api Call Util
 *
 *  ver : 0.0.1
 *  Note :
 *    - superagent 이용한 REST api Call
 */

'use strict';

import { apiPath, websocketPath } from '../constants/appSettings';
import request from 'superagent';
import $ from 'jquery';
import io from '../../../node_modules/socket.io-client/socket.io';
import uuid from 'node-uuid';

const Connection = {
  /**
   * Websocket Connect
   * @returns {Promise}
   */
  connectWebsocket : function () {
    return new Promise((resolve, reject) => {
      try {
        var connectionId = (uuid.v1()).replace(/-/g, '');
        var socket = io(websocketPath, [connectionId]);
        console.log(uuid.v1());
        resolve(socket);
      } catch(e) {
        reject(e.toString());
      }
    });
  },
  /**
   * api Get Connection
   * @param options
   * @param callback
   * @returns {Promise}
   */
  requestGet : function (options, callback) {
    return new Promise((resolve, reject) => {
      var getUrl = null;

      if (options.isTest) {
        getUrl = options.url;
      } else {
        getUrl = apiPath + options.url;
      }

      request
        .get(getUrl)
        .type('json')
        .accept('json')
        .query(options.data)
        .set({})
        .end((error, response) => {
          if (response.ok) {
            resolve(response);
            if (callback && callback.success) {
              callback.success(response);
            }
          }
          else {
            reject(response);
            if (callback && callback.error) {
              callback.error(response);
            }
          }
          if (callback && callback.complete) {
            callback.complete(response);
          }
        });

    });
  },
  /**
   * api Post Connection
   * @param options
   * @param callback
   * @returns {Promise}
   */
  requestPost : function (options, callback) {
    return new Promise((resolve, reject) => {
      var postData = options.data,
          postUrl = null,
          method = options.method || 'POST';

      if (options.isTest) {
        postUrl = options.url;
      } else {
        postUrl = apiPath + options.url;
      }

      request
        .post(postUrl)
        .type('json')
        .accept('json')
        .set({})
        .send(postData)
        .end((error, response) => {
          if (response.ok) {
            resolve(response);
            if (callback && callback.success) {
              callback.success(response);
            }
          }
          else {
            reject(response);
            if (callback && callback.error) {
              callback.error(response);
            }
          }
          if (callback && callback.complete) {
            callback.complete(response);
          }
        });
    });
  }
}

module.exports = Connection;