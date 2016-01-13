'use strict';

//Library
import React, { PropTypes } from 'react';
import Reflux from 'reflux';
import { Panel, Input, ButtonInput } from 'react-bootstrap';

//From App
import { websocketPath } from '../constants/appSettings';
import WsActions from '../actions/WsActions';
import UserStore from '../stores/UserStore';
import WsStore from '../stores/WsStore';

const WebsocketTest = React.createClass({
  /**
   * context type
   */
  contextTypes : {
    history : PropTypes.object
  },
  /**
   *  mixin
   */
  mixins : [
    Reflux.listenTo(WsStore, 'updateDataStream')
  ],
  /**
   * get initial state
   * @returns {{socket: *}}
   */
  getInitialState() {
    return {
      socket : WsStore.getDataStream(),
      submitted : false,
      socketId : null,
      errorMsg : null,
      inputStyle : null,
      sendMessage : null,
      responseMessage : null
    }
  },
  /**
   *  component가 호출되기 전 function 처리
   */
  componentDidMount() {
    var socket = this.state.socket; //getDataStream으로 websocket 가져오기

    if (socket == void 0) {
      WsActions.setDataStream();    //dataStream set
    } else {
      this.setMessageCallback();
    }
  },
  /**
   * data stream update
   */
  updateDataStream() {
    this.setState({socket : WsStore.getDataStream()});
    this.setMessageCallback();
  },
  /**
   * message callback 정의
   */
  setMessageCallback() {
    var socket = this.state.socket,
        self = this;
    /**
     *  response ID
     */
    socket.on('responseId', function (data) {
      self.setState({socketId : data.id});
    });

    socket.on('message', function (data) {
      self.setState({responseMessage : JSON.stringify(data.response)});
    });

    socket.emit('requestId', {});
  },
  /**
   * 페이지 소멸자
   */
  componentWillUnmount() {
    var socket = this.state.socket;

    if (socket != void 0) {
      socket.removeListener('responseId');
      socket.removeListener('message');

      this.setState({
        socket : null
      });
    }
  },
  /**
   * Validation
   * @param value
   */
  validation(value) {
    if (value != void 0 && value != "") {
      this.setState({
        submitted : true,
        errorMsg : '',
        inputStyle : 'success',
        sendMessage : value
      });
    } else {
      this.setState({
        submitted : false,
        errorMsg : '',
        inputStyle : null,
        sendMessage : null
      });
    }
  },
  /**
   * send Messsage
   */
  sendMsg() {
    var socket = this.state.socket,
        sendMessage = this.state.sendMessage,
        self = this;

    socket.emit('message', sendMessage);
  },
  /**
   * reset Message
   */
  reset() {
    this.setState({
      submitted : false,
      inputStyle : null,
      sendMessage : null
    });
  },
  /**
   * render
   * @returns {XML}
   */
  render() {
    const { responseMessage, sendMessage, inputStyle, errorMsg, submitted, socketId } = this.state;

    return (
      <div className="websocketTest_div">
        <Panel header="Websocket Test">
          <p>You connected Websocket. Websocket ID is : { socketId }</p>
          <Input type="textarea"
                 label="Send Messages:"
                 placeholder="Websocket Messages"
                 bsStyle={ inputStyle }
                 onChange={ (e) => this.validation(e.target.value)}
                 value={ sendMessage }
                 hasFeedback/>
          <p>{ errorMsg }</p>
          <ButtonInput type="button"
                       disabled={ !submitted }
                       onClick={ this.sendMsg }>
            Send Message
          </ButtonInput>
          <ButtonInput type="button" onClick={ this.reset }>
            reset
          </ButtonInput>
          <Input type="textarea"
                 label="Response Messages:"
                 value={ responseMessage }
                 disabled/>
        </Panel>
      </div>
    );
  }
});

export default WebsocketTest;
//<Socket.Socket url="ws://localhost:8080" />