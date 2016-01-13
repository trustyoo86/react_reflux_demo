'use strict';

import UserStore from '../stores/UserStore';

const requireAuth = (nextState, replaceState) => {
  console.log(nextState);
  console.log(replaceState);

  if (!UserStore.isSignin()) {
    replaceState({ nextPathname : nextState.location.pathname }, '/login');
  }
  console.log('require Auth!');
};

module.exports = requireAuth;