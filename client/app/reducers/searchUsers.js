import {
  SEARCH_USERS_REQUEST, 
  SEARCH_USERS_SUCCESS, 
  SEARCH_USERS_FAILURE, 
} from '../actions/searchUsers';

const initialState = {
  isFetching: false,
  searchResults: [],
  errorMessage: '',
}

function searchUsers(state = initialState, action) {
  switch (action.type) {
    case SEARCH_USERS_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
      }
    case SEARCH_USERS_SUCCESS:
      return {
        searchResults: action.searchResults,
        isFetching: false,
        errorMessage: '',
      }
    case SEARCH_USERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message.response.data.message,
      }
    default:
      return state
  }
}

export default searchUsers