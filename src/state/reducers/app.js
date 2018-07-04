import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import {
  DONE_APP_INTRO,
  APP_FIELD_CHANGED,
  DONE_SURVEY,
  UPDATE_LOCATION,
  ADD_FAVOURITE,
  REMOVE_FAVOURITE,
} from 'src/state/types';

const INITIAL_STATE = {
  introduced: false,
  surveyed: false, // make sure to add this to user meta from API so as not to bug the user
  nationality: 'default',
  occupation: 'default',
  gender: 'default',
  date: '',
  interests: {
    activities: false,
    restaurants: false,
    medical: false,
    services: false,
    shopping: false,
    volunteer: false,
  },
  currentLocation: null,
  favourites: [],
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DONE_APP_INTRO:
      return { ...state, introduced: true };
    case APP_FIELD_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case DONE_SURVEY:
      return { ...state, surveyed: true };
    case UPDATE_LOCATION:
      return { ...state, currentLocation: action.payload };
    case ADD_FAVOURITE:
      return { ...state, favourites: [...state.favourites, action.payload] };
    case REMOVE_FAVOURITE: {
      const favourites = state.favourites.filter(fav => fav !== action.payload);
      return { ...state, favourites };
    }
    default:
      return state;
  }
};

const persistConfig = {
  storage,
  key: 'app',
  blacklist: ['categories'],
};

export default persistReducer(persistConfig, authReducer);
