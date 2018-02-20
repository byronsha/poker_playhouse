import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  TOKEN_LOGIN_REQUEST,
  TOKEN_LOGIN_SUCCESS,
  TOKEN_LOGIN_FAILURE
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
      localStorage.removeItem('client')
      return {
        isFetching: false,
        isAuthenticated: false,
        user: null,
        token: null,
        errorMessage: ''
      }
    case TOKEN_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: ''
      }
    case TOKEN_LOGIN_SUCCESS:
      localStorage.setItem('client', action.token)
      return {
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
        token: action.token,
        errorMessage: ''
      }
    case TOKEN_LOGIN_FAILURE:
      localStorage.removeItem('client')
      return {
        isFetching: false,
        isAuthenticated: false,
        user: null,
        token: null,
        errorMessage: action.message.response.data.message
      }
    default:
      return state
  }
}

export default user