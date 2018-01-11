import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import config from 'src/config/debug';
import reducers from './reducers';

/* ------------- Redux Configuration ------------- */

const middleware = [];
const enhancers = [];

/* ------------- Redux Thunk Middleware ------------- */
middleware.push(thunk);

/* ------------- Redux Logger Middleware ------------- */
if (config.useReduxLogger) {
  const { logger } = require('redux-logger');

  middleware.push(logger);
}

/* ------------- Assemble Middleware ------------- */
enhancers.push(applyMiddleware(...middleware));


// if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
const createAppropriateStore = config.useReactotron ? console.tron.createStore : createStore;
const store = createAppropriateStore(reducers, compose(...enhancers));

export default store;
