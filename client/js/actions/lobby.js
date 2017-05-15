export const RECEIVE_LOBBY_INFO = 'RECEIVE_LOBBY_INFO'
export const TABLES_UPDATED = 'TABLES_UPDATED'
export const PLAYERS_UPDATED = 'PLAYERS_UPDATED'
export const TABLE_JOINED = 'TABLE_JOINED'
export const TABLE_LEFT = 'TABLE_LEFT'
export const TABLE_UPDATED = 'TABLE_UPDATED'
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED'

export function receiveLobbyInfo(tables, players, socketId) {
  return {
    type: RECEIVE_LOBBY_INFO,
    tables,
    players,
    socketId
  }
}

export function tablesUpdated(tables) {
  return {
    type: TABLES_UPDATED,
    tables
  }
}

export function playersUpdated(players) {
  return {
    type: PLAYERS_UPDATED,
    players
  }
}

export function tableJoined(tables, tableId) {
  return {
    type: TABLE_JOINED,
    tables,
    tableId
  }
}

export function tableLeft(tables, tableId) {
  return {
    type: TABLE_LEFT,
    tables,
    tableId
  }
}

export function tableUpdated(table, message, from) {
  return {
    type: TABLE_UPDATED,
    table,
    message,
    from
  }
}

export function messageReceived(message) {
  return {
    type: MESSAGE_RECEIVED,
    message
  }
}