import { SEARCH_FIELD_CHANGED, SELECT_CATEGORY, CLEAR_LISTINGS } from 'src/state/types';
import {
  fetchListing,
  performSearch,
  fetchCategories,
  fetchUserListings,
  fetchCategoryListings,
  fetchFavouriteListings,
} from 'src/models/listing';


export const searchFieldChanged = ({ prop, value }) => {
  return {
    type: SEARCH_FIELD_CHANGED,
    payload: { prop, value },
  };
};

export const getCategories = token => dispatch => fetchCategories(dispatch, token);

export const selectCategory = (id, name) => {
  return {
    type: SELECT_CATEGORY,
    payload: { id, name },
  };
};

export const getCategoryListings = (token, id, page) => {
  return dispatch => fetchCategoryListings(dispatch, token, id, page);
};

export const getListing = (token, id) => dispatch => fetchListing(dispatch, token, id);

export const searchListings = (token, search) => dispatch => performSearch(dispatch, token, search);

export const getUserListings = (token, id) => dispatch => fetchUserListings(dispatch, token, id);

export const getFavouriteListings = (token, ids) => {
  return dispatch => fetchFavouriteListings(dispatch, token, ids);
};

export const clearListings = () => {
  return { type: CLEAR_LISTINGS };
};
