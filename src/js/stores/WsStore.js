'use strict';

import Reflux from 'reflux';
import Im from 'immutable';
import WsActions from '../actions/WsActions';

const WsStore = Reflux.createStore({
  listenables : WsActions,
  init() {
    this._socketObject = null;
  },

  getDataStream() {
    return this._socketObject;
  },

  onSetDataStreamCompleted(socketObject) {
    this._socketObject = socketObject;
    this.trigger();
  },

  onSetDataStreamFailed(error) {
    console.log(error);
  }
});

export default WsStore;
