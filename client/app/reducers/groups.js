import {
  REQUEST_GROUPS,
  REQUEST_GROUPS_SUCCESS,
  REQUEST_GROUPS_FAILURE,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE,
  DELETE_GROUP_REQUEST,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILURE,
} from '../actions/groups'

const initialState = {
  groups: [],
  isLoading: false,
  errorMessage: '',
}

function groups(state = initialState, action) {
  switch (action.type) {
    case REQUEST_GROUPS:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      }
    case REQUEST_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.groups,
        isLoading: false,
        errorMessage: '',
      }
    case REQUEST_GROUPS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.message.response.data.message,
      }
    case CREATE_GROUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      }
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        groups: [...state.groups, action.group],
        isLoading: false,
        errorMessage: '',
      }
    case CREATE_GROUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.message.response.data.message,
      }
    case DELETE_GROUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      }
    case DELETE_GROUP_SUCCESS:
      return {
        ...state,
        groups: state.groups.filter(group => group.id !== action.deletedGroupId),
        isLoading: false,
        errorMessage: '',
      }
    case DELETE_GROUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.message.response.data.message,
      }
    default:
      return state
  }
}

export default groups