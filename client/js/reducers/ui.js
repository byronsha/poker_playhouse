import {
  TOGGLE_LEFT_COLUMN,
  TOGGLE_RIGHT_COLUMN,
  TOGGLE_GRID_VIEW,
  SEND_CHAT_MESSAGE
} from '../actions/ui'

const initialState = {
  leftColumnShowing: true,
  rightColumnShowing: true,
  gridViewOn: false,
  messages: []
}

function ui(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LEFT_COLUMN:
      return {
        ...state,
        leftColumnShowing: !state.leftColumnShowing
      }
    case TOGGLE_RIGHT_COLUMN:
      return {
        ...state,
        rightColumnShowing: !state.rightColumnShowing
      }
    case TOGGLE_GRID_VIEW:
      return {
        ...state,
        gridViewShowing: !state.gridViewShowing
      }
    case SEND_CHAT_MESSAGE:
      return {
        ...state,
        messages: [action.message, ...state.messages]
      }
    default:
      return state
  }
}

export default ui