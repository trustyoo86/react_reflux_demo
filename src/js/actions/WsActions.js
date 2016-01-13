'use strict';

import Reflux from 'reflux';
import $ from 'jquery';
import { connectWebsocket } from '../utils/Connection';

const WsActions = Reflux.createActions({
  'getDataStream' : {},
  'getSocketObject' : {},
  'setDataStream' : { asyncResult : true }
});

WsActions.getDataStream.preEmit = () => {

};

WsActions.setDataStream.preEmit = () => {
  connectWebsocket()
    .then(WsActions.setDataStream.completed)
    .catch(WsActions.setDataStream.failed);
};

export default WsActions;