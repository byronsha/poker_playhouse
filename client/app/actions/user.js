import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
import { hashHistory } from 'react-router'
import { push } from 'react-router-redux'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const LOGOUT = 'LOGOUT'

export const TOKEN_LOGIN_REQUEST = 'TOKEN_LOGIN_REQUEST'
export const TOKEN_LOGIN_SUCCESS = 'TOKEN_LOGIN_SUCCESS'
export const TOKEN_LOGIN_FAILURE = 'TOKEN_LOGIN_FAILURE'

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:9000/api' : '/api'

// login
export function requestLogin(params) {
  return {
    type: LOGIN_REQUEST,
    params
  }
}

export function loginSuccess(user, token) {
  return {
    type: LOGIN_SUCCESS,
    user,
    token
  }
}

export function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    message
  }
}

export function login(params) {
  return function(dispatch) {
    dispatch(requestLogin(params))

    return axios.post(`${ROOT_URL}/login`, params)
      .then(res => {
        const user = res.data.user
        const token = res.data.token

        if (user) {
          dispatch(loginSuccess(user, token))
          dispatch(push('/lobby'))
        } else {
          console.log(res)
        }
      })
      .catch(err => {
        console.log(err)
        dispatch(loginFailure(err))
      })
  }
}

// signup
export function requestSignUp(params) {
  return {
    type: SIGNUP_REQUEST,
    params
  }
}

export function signUpSuccess(user, token) {
  return {
    type: SIGNUP_SUCCESS,
    user,
    token
  }
}

export function signUpFailure(message) {
  return {
    type: SIGNUP_FAILURE,
    message
  }
}

export function signUp(params) {
  return function(dispatch) {
    dispatch(requestSignUp(params))

    return axios.post(`${ROOT_URL}/signup`, params)
      .then(res => {
        const user = res.data.user
        const token = res.data.token

        if (user) {
          dispatch(signUpSuccess(user, token))
          dispatch(push('/lobby'))          
        } else {
          console.log(res)
        }
      })
      .catch(err => {
        console.log(err)
        dispatch(signUpFailure(err))        
      })
  }
}

// logout
export function logout() {
  return function(dispatch) {
    dispatch({ type: LOGOUT })
    dispatch(push('/login'))
  }
}

// jwt token verification
export function requestTokenLogin() {
  return {
    type: TOKEN_LOGIN_REQUEST
  }
}

export function tokenLoginSuccess(user, token) {
  return {
    type: TOKEN_LOGIN_SUCCESS,
    user,
    token
  }
}

export function tokenLoginFailure(message) {
  return {
    type: TOKEN_LOGIN_FAILURE,
    message
  }
}

export function tokenLogin(token) {
  return function(dispatch) {
    dispatch(requestTokenLogin())

    return axios.post(`${ROOT_URL}/verify_jwt`, { token })
      .then(res => {
        const user = res.data.user
        const token = res.data.token

        if (user) {
          dispatch(tokenLoginSuccess(user, token))
          if (hashHistory.getCurrentLocation().pathname !== '/lobby') {
            dispatch(push('/lobby'))
          }
        } else {
          console.log(res)
        }
      })
      .catch(err => {
        console.log(err)
        dispatch(tokenLoginFailure(err))
      })
  }
}