import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
import { push } from 'react-router-redux'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const LOGOUT = 'LOGOUT'

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

    return axios.post('http://localhost:9000/api/login', params)
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

    return axios.post(`http://localhost:9000/api/signup`, params)
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
      .catch((err) => {
        console.log(err)
        dispatch(signUpFailure(err))        
      })
  }
}

// logout
export function logout() {
  dispatch(push('/login'))
  return {
    type: LOGOUT
  }
}