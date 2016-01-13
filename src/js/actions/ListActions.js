'use strict';

import Reflux from 'reflux';
import { requestGet, requestPost } from '../utils/Connection';

const ListActions = Reflux.createActions({
  'getLists' : { asyncResult : true }
});

ListActions.getLists.preEmit = (callback) => {
  var options = {
    url : 'http://localhost:3000/dummyData/list/getList.json',
    isTest : true
  };

  var action = ListActions.getLists;

  requestGet(options, callback)
    .then(callback)
    .catch(action.failed);
};

export default ListActions;