'use strict';

import Reflux from 'reflux';
import ListActions from '../actions/ListActions';

const ListStore = Reflux.createStore({
  listenable : ListActions,


});

export default ListStore;