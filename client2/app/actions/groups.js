import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const REQUEST_GROUPS = 'REQUEST_GROUPS'
export const REQUEST_GROUPS_SUCCESS = 'REQUEST_GROUPS_SUCCESS'
export const REQUEST_GROUPS_FAILURE = 'REQUEST_GROUPS_FAILURE'

export const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST'
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS'
export const CREATE_GROUP_FAILURE = 'CREATE_GROUP_FAILURE'

export const DELETE_GROUP_REQUEST = 'DELETE_GROUP_REQUEST'
export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS'
export const DELETE_GROUP_FAILURE = 'DELETE_GROUP_FAILURE'

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

export function createGroupRequest() {
  return {
    type: CREATE_GROUP_REQUEST,
  }
}

export function createGroupSuccess(group) {
  return {
    type: CREATE_GROUP_SUCCESS,
    group,
  }
}

export function createGroupFailure(message) {
  return {
    type: CREATE_GROUP_FAILURE,
    message,
  }
}

export function createGroup(accessToken, groupAttrs) {
  return function (dispatch) {
    dispatch(createGroupRequest())

    return axios.post(`${ROOT_URL}/groups`, { accessToken, groupAttrs })
      .then(res => {
        const { group } = res.data
        dispatch(createGroupSuccess(group))
      })
      .catch(err => {
        console.log(err)
        dispatch(createGroupFailure(err))
      })
  }
}

export function deleteGroupRequest() {
  return {
    type: DELETE_GROUP_REQUEST,
  }
}

export function deleteGroupSuccess(deletedGroupId) {
  return {
    type: DELETE_GROUP_SUCCESS,
    deletedGroupId,
  }
}

export function deleteGroupFailure(message) {
  return {
    type: DELETE_GROUP_FAILURE,
    message,
  }
}

export function deleteGroup(accessToken, groupId) {
  return function (dispatch) {
    dispatch(deleteGroupRequest())

    return axios.delete(`${ROOT_URL}/groups/${groupId}?accessToken=${accessToken}`)
      .then(res => {
        const { deletedGroupId } = res.data
        dispatch(deleteGroupSuccess(deletedGroupId))
      })
      .catch(err => {
        console.log(err)
        dispatch(deleteGroupFailure(err))
      })
  }
}
