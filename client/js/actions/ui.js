export const TOGGLE_LEFT_COLUMN = 'TOGGLE_LEFT_COLUMN'
export const TOGGLE_RIGHT_COLUMN = 'TOGGLE_RIGHT_COLUMN'
export const TOGGLE_GRID_VIEW = 'TOGGLE_GRID_VIEW'
export const SEND_CHAT_MESSAGE = 'SEND_CHAT_MESSAGE'

export function toggleLeftColumn() {
  return {
    type: TOGGLE_LEFT_COLUMN
  }
}

export function toggleRightColumn() {
  return {
    type: TOGGLE_RIGHT_COLUMN
  }
}

export function toggleGridView() {
  return {
    type: TOGGLE_GRID_VIEW
  }
}

export function sendChatMessage(message) {
  return {
    type: SEND_CHAT_MESSAGE,
    message
  }
}