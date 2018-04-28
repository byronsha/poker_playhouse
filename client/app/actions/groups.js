import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const REQUEST_GROUPS = 'REQUEST_GROUPS'
export const REQUEST_GROUPS_SUCCESS = 'REQUEST_GROUPS_SUCCESS'
export const REQUEST_GROUPS_FAILURE = 'REQUEST_GROUPS_FAILURE'

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:9000/api' : '/api'

export function requestGroups() {
  return {
    type: REQUEST_GROUPS,
  }
}

export function requestGroupsSuccess(groups) {
  return {
    type: REQUEST_GROUPS_SUCCESS,
    groups,
  }
}

export function requestGroupsFailure(message) {
  return {
    type: REQUEST_GROUPS_FAILURE,
    message,
  }
}

export function fetchGroups(token) {
  return function (dispatch) {
    dispatch(requestGroups())

    return axios.get(`${ROOT_URL}/groups?access_token=${token}`)
      .then(res => {
        const { groups } = res.data
        dispatch(requestGroupsSuccess(groups))
      })
      .catch(err => {
        console.log(err)
        dispatch(requestGroupsFailure(err))
      })
  }
}
