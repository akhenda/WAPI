import { AUTH_FIELD_CHANGED, AUTH_LOADING, CLEAR_INPUT_DATA } from 'src/state/types';
import {
  signInUser,
  signUpUser,
  signOutUser,
  saveUserInfo,
  saveUserMeta,
  fetchUserInfo,
  isUserAuthenticated,
} from 'src/models/user';


export const authFieldChanged = ({ prop, value }) => {
  return {
    type: AUTH_FIELD_CHANGED,
    payload: { prop, value },
  };
};

export const isUserSignedIn = (token) => {
  return (dispatch) => {
    dispatch({ type: AUTH_LOADING });
    isUserAuthenticated(dispatch, token);
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: AUTH_LOADING });
    signInUser(dispatch, email, password);
  };
};

export const registerUser = (data) => {
  return (dispatch) => {
    dispatch({ type: AUTH_LOADING });
    signUpUser(dispatch, data);
  };
};

export const getUserInfo = token => dispatch => fetchUserInfo(dispatch, token);

export const updateUserInfo = (token, values) => dispatch => saveUserInfo(dispatch, token, values);
export const updateUserMeta = (token, values) => dispatch => saveUserMeta(dispatch, token, values);

export const clearInputData = () => dispatch => dispatch({ type: CLEAR_INPUT_DATA });

export const signOut = () => dispatch => signOutUser(dispatch);
