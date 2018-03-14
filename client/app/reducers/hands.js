import {
  REQUEST_HANDS,
  REQUEST_HANDS_SUCCESS,
  REQUEST_HANDS_FAILURE,
} from '../actions/hands'

const initialState = {
  isFetching: false,
  hands: [],
  pages: 0,
  count: 0,
  errorMessage: '',
}

function hands(state = initialState, action) {
  switch (action.type) {
    case REQUEST_HANDS:
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
      }
    case REQUEST_HANDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hands: action.hands,
        pages: action.pages,
        count: action.count,
        errorMessage: '',
      }
    case REQUEST_HANDS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message.response.data.message,
      }
    default:
      return state
  }
}

export default hands