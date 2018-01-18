import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { DONE_APP_INTRO } from 'src/state/types';

const INITIAL_STATE = {
  introduced: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DONE_APP_INTRO:
      return { ...state, introduced: true };
    default:
      return state;
  }
};

const persistConfig = {
  storage,
  key: 'app',
  blacklist: [],
};

export default persistReducer(persistConfig, authReducer);
