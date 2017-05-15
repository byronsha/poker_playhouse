import {
  TOGGLE_LEFT_COLUMN,
  TOGGLE_RIGHT_COLUMN,
  TOGGLE_GRID_VIEW
} from '../actions/ui'

const initialState = {
  leftColumnShowing: true,
  rightColumnShowing: true,
  gridViewOn: false
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
    default:
      return state
  }
}

export default ui