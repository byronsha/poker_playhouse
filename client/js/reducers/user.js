import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT
} from '../actions/user'

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('client') || null,
  errorMessage: ''
}

function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: ''
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('client', action.token)
      return {
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
        token: action.token,
        errorMessage: ''
      }
    case LOGIN_FAILURE:
      return {
        isFetching: false,
        isAuthenticated: false,
        user: null,
        token: null,
        errorMessage: action.message.response.data.message
      }
    case SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: ''
      }
    case SIGNUP_SUCCESS:
      localStorage.setItem('client', action.token)    
      return {
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
        token: action.token,
        errorMessage: ''
      }
    case SIGNUP_FAILURE:
      return {
        isFetching: false,
        isAuthenticated: false,
        user: null,
        token: null,
        errorMessage: action.message.response.data.message
      }
    case LOGOUT:
      localStorage.removeItem('client');
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        user: null,
        token: null
      }
    default:
      return state
  }
}

export default user