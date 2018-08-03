import { Actions } from 'react-native-router-flux';
import API from 'src/services/api';
import DebugConfig from 'src/config/debug';
import FixtureAPI from 'src/services/fixtureApi';

import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  FETCH_USER_FAILURE,
  SIGNUP_USER_FAILURE,
  SIGNOUT_USER_SUCCESS,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILURE,
  UPDATE_USER_META_SUCCESS,
  UPDATE_USER_META_FAILURE,
} from 'src/state/types';


const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

const responseFailure = (dispatch, type, response) => {
  let message = 'An error occured! Please try again.';
  const { message: resMsg } = response.data;

  if (response.problem === 'TIMEOUT_ERROR') {
    message = 'A timeout error occured! Check your internet connection and then try again.';
  } else if (response.problem === 'NETWORK_ERROR') {
    message = 'A network error occured! Check your internet connection and then try again.';
  } else if (response.problem === 'CONNECTION_ERROR') {
    message = 'A connection error occured! Service is currently unavailable. Please try again later.';
  } else if (resMsg) {
    message = resMsg;
  } else if (response.data) {
    return dispatch({ type, payload: response.data });
  }

  return dispatch({ type, payload: { message } });
};

export const isUserAuthenticated = (dispatch, token) => {
  api
    .validateToken(token)
    .then((res) => {
      if (res.ok) {
        fetchUserInfo(dispatch, token);
        // I am thinking 🤔, we do not need to call the above here.
        // We already have the user object persisted
      } else {
        const payload = {};
        dispatch({ type: FETCH_USER_FAILURE, payload });
        Actions.lightbox({ type: 'reset' });
      }
    });
};

export const signUpUser = (dispatch, data) => {
  const {
    email, username, firstName, lastName, password,
  } = data;

  api
    .signUpUser(email, username, firstName, lastName, password)
    .then((res) => {
      if (res.status === 201) {
        signInUser(dispatch, email, password);
      } else {
        responseFailure(dispatch, SIGNUP_USER_FAILURE, res);
      }
    })
    .catch((error) => {
      dispatch({ type: SIGNUP_USER_FAILURE, payload: error });
    });
};

export const signInUser = (dispatch, email, password) => {
  api
    .loginUser(email, password)
    .then((res) => {
      if (res.status === 200) {
        fetchUserInfo(dispatch, res.data.token, true);
      } else {
        responseFailure(dispatch, LOGIN_USER_FAILURE, res);
      }
    });
};

export const fetchUserInfo = (dispatch, token, navigate=false) => {
  api.setHeader('Authorization', `Bearer ${token}`);
  api
    .getUserInfo('edit')
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: { token, user: res.data } });
        if (navigate) Actions.lightbox({ type: 'reset' });
      } else {
        responseFailure(dispatch, FETCH_USER_FAILURE, res);
      }
    });
};

export const saveUserInfo = (dispatch, token, data) => {
  api.setHeader('Authorization', `Bearer ${token}`);
  api
    .updateUserInfo('edit', data)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: UPDATE_USER_INFO_SUCCESS, payload: res.data });
      } else {
        responseFailure(dispatch, UPDATE_USER_INFO_FAILURE, res);
      }
    });
};

export const saveUserMeta = (dispatch, token, data) => {
  api.setHeader('Authorization', `Bearer ${token}`);
  api
    .updateUserMeta('edit', data)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: UPDATE_USER_META_SUCCESS, payload: res.data });
      } else {
        responseFailure(dispatch, UPDATE_USER_META_FAILURE, res);
      }
    });
};

export const signOutUser = (dispatch) => {
  // delete the token and navigate to the login screen
  dispatch({ type: SIGNOUT_USER_SUCCESS });
  Actions.lightbox({ type: 'replace' });
};
