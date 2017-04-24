const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js')

const Player = require('./poker/player.js')
const Table = require('./poker/table.js')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.static(__dirname + '/public'))
app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(bodyParser.urlencoded({ extended: false }))

const tables = {}
const players = {}

tables[1] = new Table(1, 'Table 1', 6, 10)
tables[2] = new Table(2, 'Table 2', 9, 10)

io.on('connection', socket => {
  socket.on('message', body => {
    const sender = players[socket.id]
    socket.broadcast.emit('message', {
      body,
      from: sender.name
    })
  })

  socket.on('fetch_lobby_info', () => {
    socket.emit('receive_lobby_info', {
      tables,
      players
    })
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

  socket.on('leave_table', table => {
    tables[table.id].removePlayer(socket.id)

    socket.broadcast.emit('tables_updated', tables)    
    socket.emit('table_left', tables)
  })

  socket.on('raise', ({ tableId, amount }) => {
    const table = tables[tableId]
    const seat = table.findPlayerBySocketId(socket.id)
    const addToPot = amount - seat.bet

    seat.raise(amount)

    if (table.callAmount) {
      table.minRaise = table.callAmount + (seat.bet - table.callAmount) * 2
    } else {
      table.minRaise = seat.bet * 2
    }
    
    table.callAmount = amount
    table.pot += addToPot

    table.changeTurn(seat.id)

    broadcastToTable(table)
  })

  socket.on('check', tableId => {
    const table = tables[tableId]
    const seat = table.findPlayerBySocketId(socket.id)

    seat.check()
    table.changeTurn(seat.id)

    broadcastToTable(table)

    if (table.handOver) {
      initNewHand(table)
    }
  })

  socket.on('call', tableId => {
    const table = tables[tableId]
    const seat = table.findPlayerBySocketId(socket.id)

    let addToPot
    if (table.callAmount > seat.stack) {
      addToPot = seat.stack - seat.bet
    } else {
      addToPot = table.callAmount - seat.bet
    }

    seat.callRaise(table.callAmount)
    table.pot += addToPot
    table.changeTurn(seat.id)

    broadcastToTable(table)

    if (table.handOver) {
      initNewHand(table)
    }
  })

  socket.on('fold', tableId => {
    const table = tables[tableId]
    const seat = table.findPlayerBySocketId(socket.id)
    seat.fold()
    table.changeTurn(seat.id)

    broadcastToTable(table)

    if (table.handOver) {
      initNewHand(table)
    }
  })

  socket.on('sit_down', ({ tableId, seatId }) => {
    const table = tables[tableId]
    table.sitPlayer(players[socket.id], seatId)

    broadcastToTable(table)
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

  function broadcastToTable(table) {
    for (let i = 0; i < table.players.length; i++) {
      let socketId = table.players[i].socketId
      let tableCopy = hideOpponentCards(table, socketId)
      io.to(socketId).emit('table_updated', tableCopy)
    }
  }

  function hideOpponentCards(table, socketId) {
    let tableCopy = JSON.parse(JSON.stringify(table))
    let hiddenHand = [
      { suit: 'hidden', rank: 'hidden'},
      { suit: 'hidden', rank: 'hidden'}
    ]

    for (let i = 1; i <= tableCopy.maxPlayers; i++) {
      if (tableCopy.seats[i] && tableCopy.seats[i].player.socketId !== socketId) {
        tableCopy.seats[i].hand = hiddenHand
      }
    }

    return tableCopy
  }

  function initNewHand(table) {
    setTimeout(() => {
      table.clearHand()
      table.startHand()
      broadcastToTable(table)
    }, 5000)
  }
})

server.listen(9000)


// 1. player sits down
// 2. todo: player enters buyin amount
// 3. check if two people are sitting
// 4. start the game in x seconds
// 5. create a new poker deck and deal hands
//   need to keep track of:
//     -player turn - options:
//       -fold
//       -call
//       -bet amounts: 
//         -min: small blind is limit/2

//         e.g. 10NL - blinds 5c/10c, buyin $5-10

//         -minbet 5c
//         -minraise - double the amount raised (after calling previous)

//         for each round keep track of
//         -npm odds
//         -pot
//         -call amount

//     -pot

// 6. 