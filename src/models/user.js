import { Actions } from 'react-native-router-flux';
import API from 'src/services/api';
import DebugConfig from 'src/config/debug';
import FixtureAPI from 'src/services/fixtureApi';

import {
  LOGIN_USER_SUCCESSFUL,
  LOGIN_USER_FAILED,
  FETCH_USER_FAILED,
  SIGNUP_USER_FAILED,
  SIGN_OUT_USER_SUCCESS,
} from 'src/state/types';


const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

export const isUserAuthenticated = (dispatch, token) => {  
  api
    .validateToken(token)
    .then((res) => {
      console.tron.log(res);
      if (res.ok) {
        fetchUserInfo(dispatch, token);
      } else {
        dispatch({ type: FETCH_USER_FAILED, payload: res.data });
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
        dispatch({ type: SIGNUP_USER_FAILED, payload: res.data });
      }
    })
    .catch((error) => {
      dispatch({ type: SIGNUP_USER_FAILED, payload: error });
    });
};

export const signInUser = (dispatch, email, password) => {
  api
    .loginUser(email, password)
    .then((res) => {
      if (res.status === 200) {
        fetchUserInfo(dispatch, res.data.token);
      } else {
        dispatch({ type: LOGIN_USER_FAILED, payload: res.data });
      }
    });
};

export const fetchUserInfo = (dispatch, token) => {
  api.setHeader('Authorization', `Bearer ${token}`);
  api
    .getUserInfo('edit')
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: LOGIN_USER_SUCCESSFUL, payload: { token, user: res.data } });
        Actions.main({ type: 'reset' });
      } else {
        dispatch({ type: FETCH_USER_FAILED, payload: res.data });
      }
    });
};

export const signOutUser = (dispatch) => {
  // delete the token

  dispatch({ type: SIGN_OUT_USER_SUCCESS });
  Actions.auth({ type: 'reset' });
};
