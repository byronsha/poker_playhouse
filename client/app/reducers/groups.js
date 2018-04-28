import {
  REQUEST_GROUPS,
  REQUEST_GROUPS_SUCCESS,
  REQUEST_GROUPS_FAILURE,
} from '../actions/groups'

const initialState = {
  groups: [],
  isFetching: false,
  errorMessage: '',
}

function groups(state = initialState, action) {
  switch (action.type) {
    case REQUEST_GROUPS:
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
      }
    case REQUEST_GROUPS_SUCCESS:
      return {
        groups: action.groups,
        isFetching: false,
        errorMessage: '',
      }
    case REQUEST_GROUPS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message.response.data.message,
      }
    default:
      return state
  }
}

export default groups