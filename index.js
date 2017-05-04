const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js')

const Player = require('./src/game_logic/player.js')
const Table = require('./src/game_logic/table.js')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.static(__dirname))
app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(bodyParser.urlencoded({ extended: false }))

const tables = {}
const players = {}

tables[1] = new Table(1, 'Table 1', 6, 10)
tables[2] = new Table(2, 'Table 2', 6, 10)
tables[3] = new Table(3, 'Table 3', 6, 20)
tables[4] = new Table(4, 'Table 4', 6, 20)
tables[5] = new Table(5, 'Table 5', 6, 50)
tables[6] = new Table(6, 'Table 6', 9, 10)
tables[7] = new Table(7, 'Table 7', 9, 10)
tables[8] = new Table(8, 'Table 8', 9, 20)
tables[9] = new Table(9, 'Table 9', 9, 20)
tables[10] = new Table(10, 'Table 10', 9, 50)

io.on('connection', socket => {
  socket.on('message', body => {
    const sender = players[socket.id]
    socket.broadcast.emit('message', { body, from: sender.name })
  })

  socket.on('fetch_lobby_info', () => {
    socket.emit('receive_lobby_info', { tables, players })
  })

  socket.on('join_lobby', playerName => {
    players[socket.id] = new Player(socket.id, playerName, 1000)
    
    socket.emit('lobby_joined', players[socket.id])
    socket.broadcast.emit('players_updated', players)
  })

  socket.on('join_table', tableId => {
    tables[tableId].addPlayer(players[socket.id])

    socket.broadcast.emit('tables_updated', tables)
    socket.emit('table_joined', { tables, tableId })
  })

  socket.on('leave_table', tableId => {
    tables[tableId].removePlayer(socket.id)

    socket.broadcast.emit('tables_updated', tables)    
    socket.emit('table_left', { tables, tableId })
  })

  socket.on('raise', ({ tableId, amount }) => {
    let table = tables[tableId]
    let message = table.handleRaise(socket.id, amount)

    broadcastToTable(table, message)
  })

  socket.on('check', tableId => {
    let table = tables[tableId]
    let message = table.handleCheck(socket.id)

    broadcastToTable(table, message)
    if (table.handOver) initNewHand(table)
  })

  socket.on('call', tableId => {
    let table = tables[tableId]
    let message = table.handleCall(socket.id)

    broadcastToTable(table, message)
    if (table.handOver) initNewHand(table)
  })

  socket.on('fold', tableId => {
    let table = tables[tableId]
    let message = table.handleFold(socket.id)

    broadcastToTable(table, message)
    if (table.handOver) initNewHand(table)
  })

  socket.on('table_message', ({ message, from, tableId }) => {
    let table = tables[tableId]
    broadcastToTable(table, message, from)
  })

  socket.on('sit_down', ({ tableId, seatId }) => {
    let table = tables[tableId]
    let message = `${players[socket.id].name} sat down in Seat ${seatId}`
    table.sitPlayer(players[socket.id], seatId)

    broadcastToTable(table, message)
    if (table.satPlayers().length === 2) initNewHand(table)
  })

  socket.on('disconnect', () => {
    delete players[socket.id]
    removeFromTables(socket.id)

    socket.broadcast.emit('tables_updated', tables)
    socket.broadcast.emit('players_updated', players)
  })

  function removeFromTables(socketId) {
    for (let i = 0; i < Object.keys(tables).length; i++) {
      tables[Object.keys(tables)[i]].removePlayer(socketId)
    }
  }

  function broadcastToTable(table, message, from = null) {
    for (let i = 0; i < table.players.length; i++) {
      let socketId = table.players[i].socketId
      let tableCopy = hideOpponentCards(table, socketId)
      io.to(socketId).emit('table_updated', { table: tableCopy, message, from })
    }
  }

  function hideOpponentCards(table, socketId) {
    let tableCopy = JSON.parse(JSON.stringify(table))
    let hiddenCard = { suit: 'hidden', rank: 'hidden'}
    let hiddenHand = [hiddenCard, hiddenCard]

    for (let i = 1; i <= tableCopy.maxPlayers; i++) {
      let currentSeat = tableCopy.seats[i]
      if (
        currentSeat &&
        currentSeat.hand.length > 0 &&
        currentSeat.lastAction !== 'WINNER' &&
        currentSeat.player.socketId !== socketId
      ) {
        currentSeat.hand = hiddenHand
      }
    }

    return tableCopy
  }

  function initNewHand(table) {
    table.clearWinMessages()
    broadcastToTable(table, '---New hand starting in 5 seconds---')
    setTimeout(() => {
      table.clearHand()
      table.startHand()
      broadcastToTable(table, '---New hand started---')
    }, 5000)
  }
})

server.listen(9000)