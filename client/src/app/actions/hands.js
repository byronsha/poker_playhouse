import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const REQUEST_HANDS = 'REQUEST_HANDS'
export const REQUEST_HANDS_SUCCESS = 'REQUEST_HANDS_SUCCESS'
export const REQUEST_HANDS_FAILURE = 'REQUEST_HANDS_FAILURE'

const ROOT_URL = '/api' //location.href.indexOf('localhost') > 0 ? 'http://localhost:9000/api' : '/api'

export function requestHands() {
  return {
    type: REQUEST_HANDS,
  }
}

export function requestHandsSuccess(hands, count, pages) {
  return {
    type: REQUEST_HANDS_SUCCESS,
    hands,
    count,
    pages,
  }
}

export function requestHandsFailure(message) {
  return {
    type: REQUEST_HANDS_FAILURE,
    message,
  }
}

export function fetchHandHistory(token, page) {
  return function(dispatch) {
    dispatch(requestHands())

    return axios.post(`${ROOT_URL}/hand-history/${page}`, { token })
      .then(res => {
        const { hands, count, pages } = res.data
        dispatch(requestHandsSuccess(hands, count, pages))
      })
      .catch(err => {
        console.log(err)
        dispatch(requestHandsFailure(err))
      })
  }
}
