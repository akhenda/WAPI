import { combineReducers } from 'redux';

import app from './app';
import auth from './auth';
import listings from './listings';

export default combineReducers({
  app,
  auth,
  listings,
});
