import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
export const SEARCH_USERS_FAILURE = 'SEARCH_USERS_FAILURE';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:9000/api' : '/api'

export function searchUsersRequest() {
  return {
    type: SEARCH_USERS_REQUEST,
  }
}

export function searchUsersSuccess(searchResults) {
  return {
    type: SEARCH_USERS_SUCCESS,
    searchResults,
  }
}

export function searchUsersFailure(message) {
  return {
    type: SEARCH_USERS_FAILURE,
    message,
  }
}

export function searchUsers(token, searchQuery) {
  return function (dispatch) {
    dispatch(searchUsersRequest())

    return axios.get(`${ROOT_URL}/users/search?accessToken=${token}&searchQuery=${searchQuery}`)
      .then(res => {
        const { searchResults } = res.data;
        dispatch(searchUsersSuccess(searchResults))
      })
      .catch(err => {
        console.log(err)
        dispatch(searchUsersFailure(err))
      })
  }
}