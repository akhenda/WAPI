import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import {
  AUTH_FIELD_CHANGED,
  AUTH_LOADING,
  LOGIN_USER_SUCCESSFUL,
  LOGIN_USER_FAILED,
  FETCH_USER_SUCCESSFUL,
  FETCH_USER_FAILED,
  SIGNUP_USER_SUCCESSFUL,
  SIGNUP_USER_FAILED,
  SIGN_OUT_USER_SUCCESS,
  CLEAR_INPUT_DATA,
} from 'src/state/types';

const INITIAL_STATE = {
  authenticated: false,
  fullName: '',
  username: '',
  email: '',
  password: '',
  loading: false,
  error: {},
  token: 'dummy',
  user: null,
  message: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_FIELD_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case AUTH_LOADING:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESSFUL:
      return {
        ...INITIAL_STATE,
        authenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGIN_USER_FAILED:
      return {
        ...state,
        token: '',
        loading: false,
        error: { message: action.payload.message.split(' ').slice(1).join(' ') },
      };
    case FETCH_USER_SUCCESSFUL:
      return { ...state, user: action.payload, authenticated: true };
    case FETCH_USER_FAILED:
      return {
        ...state,
        user: null,
        loading: false,
        authenticated: false,
      };
    case SIGNUP_USER_SUCCESSFUL:
      return {
        ...state,
        error: {},
        loading: false,
        user: action.payload,
        message: 'Account created succesfuly. Log in below',
      };
    case SIGNUP_USER_FAILED:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_INPUT_DATA:
      return {
        ...state,
        error: {},
        email: '',
        password: '',
        fullName: '',
        username: '',
      };
    case SIGN_OUT_USER_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

const persistConfig = {
  storage,
  key: 'auth',
  blacklist: [
    'error',
    'email',
    'message',
    'loading',
    'password',
    'fullName',
    'username',
    'authenticated',
  ],
};

export default persistReducer(persistConfig, authReducer);
