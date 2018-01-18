import { SEARCH_FIELD_CHANGED } from 'src/state/types';
import {
  fetchCategories,
  fetchCategoryListings,
  fetchListing,
  performSearch,
} from 'src/models/listing';


export const searchFieldChanged = ({ prop, value }) => {
  return {
    type: SEARCH_FIELD_CHANGED,
    payload: { prop, value },
  };
};

export const getCategories = token => dispatch => fetchCategories(dispatch, token);

export const getCategoryListings = token => dispatch => fetchCategoryListings(dispatch, token);

export const getListing = token => dispatch => fetchListing(dispatch, token);

export const searchListings = token => dispatch => performSearch(dispatch, token);
