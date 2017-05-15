import Moment from 'moment'
import {
  RECEIVE_LOBBY_INFO,
  TABLES_UPDATED,
  PLAYERS_UPDATED,
  TABLE_JOINED,
  TABLE_LEFT,
  TABLE_UPDATED,
  MESSAGE_RECEIVED
} from '../actions/lobby'

const initialState = {
  tables: {},
  players: {},
  openTables: {},
  messages: []
}

function lobby(state = initialState, action) {
  let newOpenTables
  switch (action.type) {
    case RECEIVE_LOBBY_INFO:
      return {
        ...state,
        tables: action.tables,
        players: action.players
      }
    case TABLES_UPDATED:
      newOpenTables = state.openTables
      for (let tableId of Object.keys(newOpenTables)) {
        newOpenTables[tableId].table = action.tables[tableId]
      }

      return {
        ...state,
        tables: action.tables,
        openTables: newOpenTables
      }
    case PLAYERS_UPDATED:
      return {
        ...state,
        players: action.players
      }
    case TABLE_JOINED:
      newOpenTables = state.openTables
      newOpenTables[action.tableId] = {
        table: action.tables[action.tableId],
        messages: []
      }

      return {
        ...state,
        tables: action.tables,
        openTables: newOpenTables
      }
    case TABLE_LEFT:
      newOpenTables = state.openTables
      delete newOpenTables[action.tableId]

      return {
        ...state,
        tables: action.tables,
        openTables: newOpenTables
      }
    case TABLE_UPDATED:
      newOpenTables = JSON.parse(JSON.stringify(state.openTables))

      if (newOpenTables[action.table.id]) {
        newOpenTables[action.table.id].table = action.table

        if (action.message) {
          const newMessage = {
            message: action.message,
            from: action.from,
            timestamp: Moment().format('LTS')
          }
          newOpenTables[action.table.id].messages.push(newMessage)
        }

        for (let winMessage of action.table.winMessages) {
          const newWinMessage = {
            message: winMessage,
            from: action.from,
            timestamp: Moment().format('LTS')
          }
          newOpenTables[action.table.id].messages.push(newWinMessage)          
        }
      }

      return {
        ...state,
        openTables: newOpenTables
      }
    case MESSAGE_RECEIVED:
      return {
        ...state,
        messages: [action.message, ...state.messages]
      }
    default:
      return state
  }
}

export default lobby