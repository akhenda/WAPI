// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import Config from 'react-native-config';


const rax = require('retry-axios');

// our "constructor"
const create = (baseURL = 'https://wapi-kenya.com/wp-json/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  });

  /* eslint-disable no-unused-vars */
  const interceptorId = rax.attach(api.axiosInstance);
  const setHeader = (header, value) => api.setHeader(header, value);

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const signUpUser = (email, username, firstName, lastName, password) => {
    return api.post(
      'custom/v1/registration',
      {
        email,
        username,
        password,
        last_name: lastName,
        first_name: firstName,
      },
      { headers: { 'API-KEY': Config.WAPI_API_KEY } },
    );
  };
  const loginUser = (email, password) => api.post('jwt-auth/v1/token', { username: email, password });
  const validateToken = (token) => {
    return api.post(
      'jwt-auth/v1/token/validate',
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
  };
  const getUserInfo = context => api.get(`wp/v2/users/me?context=${context}`);
  const updateUserInfo = (context, data) => {
    return api.patch(
      `wp/v2/users/me?context=${context}`,
      {
        description: data.bio,
        username: data.username,
        last_name: data.lastName,
        email: data.emailAddress,
        first_name: data.firstName,
        meta: {
          nationality: data.nationality[0],
          occupation: data.occupation[0],
          interested_in_activities: data.activities === true || data.activities === 1 || data.activities === '1' ? 1 : 0,
          interested_in_restaurants: data.restaurants === true || data.restaurants === 1 || data.restaurants === '1' ? 1 : 0,
          interested_in_medical: data.medical === true || data.medical === 1 || data.medical === '1' ? 1 : 0,
          interested_in_services: data.services === true || data.services === 1 || data.services === '1' ? 1 : 0,
          interested_in_shopping: data.shopping === true || data.shopping === 1 || data.shopping === '1' ? 1 : 0,
          interested_in_volunteering: data.volunteering === true || data.volunteering === 1 || data.volunteering === '1' ? 1 : 0,
        },
      },
    );
  };

  const updateUserMeta = (context, data) => {
    return api.patch(
      `wp/v2/users/me?context=${context}`,
      {
        meta: {
          surveyed: data.surveyed === true || data.surveyed === 1 || data.surveyed === '1' ? 1 : 0,
          nationality: data.nationality,
          occupation: data.occupation,
          interested_in_activities: data.activities === true || data.activities === 1 || data.activities === '1' ? 1 : 0,
          interested_in_restaurants: data.restaurants === true || data.restaurants === 1 || data.restaurants === '1' ? 1 : 0,
          interested_in_medical: data.medical === true || data.medical === 1 || data.medical === '1' ? 1 : 0,
          interested_in_services: data.services === true || data.services === 1 || data.services === '1' ? 1 : 0,
          interested_in_shopping: data.shopping === true || data.shopping === 1 || data.shopping === '1' ? 1 : 0,
          interested_in_volunteering: data.volunteering === true || data.volunteering === 1 || data.volunteering === '1' ? 1 : 0,
        },
      },
    );
  };

  const getCategories = () => api.get('wp/v2/listing-category');
  const getCategoryListings = (id, page) => api.get(`wp/v2/listing?listing-category=${id}&page=${page}`);
  const searchListings = search => api.get(`wp/v2/listing?search=${search}`);
  const getListing = id => api.get(`wp/v2/listing/${id}`);
  const getUserListings = id => api.get(`wp/v2/listing?context=embed&author=${id}`);
  const getFavouriteListings = ids => api.get(`wp/v2/listing?${ids}`); // e.g. include[]=1367&include[]=1065

  const getListingReviews = url => api.get(url);
  const submitListingReview = (data) => {
    return api.post(
      'wp/v2/lp-reviews',
      {
        title: data.title,
        content: data.description,
        status: 'publish',
        listingpro: {
          rating: data.rating,
          listing_id: data.listing_id,
        },
      },
    );
  };

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    setHeader,
    signUpUser,
    loginUser,
    validateToken,
    getUserInfo,
    updateUserInfo,
    updateUserMeta,
    getCategories,
    getCategoryListings,
    searchListings,
    getListing,
    getUserListings,
    getFavouriteListings,
    getListingReviews,
    submitListingReview,
  };
};

// let's return back our create method as the default.
export default { create };
