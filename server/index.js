const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const webpack = require('webpack')
const path = require('path')
const webpackConfig = require('../webpack.config.js')
const routes = require('./routes/index')
const db = require('./models')

const Player = require('./poker_game/player.js')
const Table = require('./poker_game/table.js')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)
const compiler = webpack(webpackConfig)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
} else if (process.env.NODE_ENV === 'production') {
  app.get('/', (res, req) => {
    res.sendFile(path.join(__dirname + 'index.html'))
  })
}

app.use('/api', routes)

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
  socket.on('fetch_lobby_info', user => {
    players[socket.id] = new Player(socket.id, user.id, user.username, user.bankroll)

    socket.emit('receive_lobby_info', { tables, players, socketId: socket.id })
    socket.broadcast.emit('players_updated', players)
  })

  socket.on('join_table', tableId => {
    tables[tableId].addPlayer(players[socket.id])

    socket.broadcast.emit('tables_updated', tables)
    socket.emit('table_joined', { tables, tableId })
  })

  socket.on('leave_table', tableId => {
    const table = tables[tableId]
    const player = players[socket.id]
    const seat = Object.values(table.seats).find(seat =>
      seat && seat.player.socketId === socket.id
    )
    if (seat) {
      updatePlayerBankroll(player, seat.stack)
    }
    
    table.removePlayer(socket.id)

    socket.broadcast.emit('tables_updated', tables)    
    socket.emit('table_left', { tables, tableId })

    if (table.activePlayers().length === 1) {
      clearForOnePlayer(table)
    }
  })

  socket.on('fold', tableId => {
    let table = tables[tableId]
    let { seatId, message } = table.handleFold(socket.id)
    broadcastToTable(table, message)
    changeTurnAndBroadcast(table, seatId)
  })

  socket.on('check', tableId => {
    let table = tables[tableId]
    let { seatId, message } = table.handleCheck(socket.id)
    broadcastToTable(table, message)
    changeTurnAndBroadcast(table, seatId)
  })

  socket.on('call', tableId => {
    let table = tables[tableId]
    let { seatId, message } = table.handleCall(socket.id)
    broadcastToTable(table, message)
    changeTurnAndBroadcast(table, seatId)
  })

  socket.on('raise', ({ tableId, amount }) => {
    let table = tables[tableId]
    let { seatId, message } = table.handleRaise(socket.id, amount)
    broadcastToTable(table, message)
    changeTurnAndBroadcast(table, seatId)
  })

  socket.on('table_message', ({ message, from, tableId }) => {
    let table = tables[tableId]
    broadcastToTable(table, message, from)
  })

  socket.on('sit_down', ({ tableId, seatId, amount }) => {
    const table = tables[tableId]
    const player = players[socket.id]

    table.sitPlayer(player, seatId, amount)
    let message = `${player.name} sat down in Seat ${seatId}`

    updatePlayerBankroll(player, -(amount))

    broadcastToTable(table, message)
    if (table.activePlayers().length === 2) {
      initNewHand(table)
    }
  })

  socket.on('rebuy', ({ tableId, seatId, amount }) => {
    const table = tables[tableId]
    const player = players[socket.id]
    
    table.rebuyPlayer(seatId, amount)
    updatePlayerBankroll(player, -(amount))

    broadcastToTable(table)
  })

  socket.on('stand_up', tableId => {
    const table = tables[tableId]
    const player = players[socket.id]
    const seat = Object.values(table.seats).find(seat =>
      seat && seat.player.socketId === socket.id
    )
    if (seat) {
      updatePlayerBankroll(player, seat.stack)
    }

    const message = `${player.name} left the table`
    table.standPlayer(socket.id)

    broadcastToTable(table, message)
    if (table.activePlayers().length === 1) {
      clearForOnePlayer(table)
    }
  })

  socket.on('sitting_out', ({ tableId, seatId }) => {
    const table = tables[tableId]
    const seat = table.seats[seatId]
    seat.sittingOut = true

    broadcastToTable(table)
  })

  socket.on('sitting_in', ({ tableId, seatId }) => {
    const table = tables[tableId]
    const seat = table.seats[seatId]
    seat.sittingOut = false

    broadcastToTable(table)
    if (table.handOver && table.activePlayers().length === 2) {
      initNewHand(table)
    }
  })

  socket.on('disconnect', () => {
    const seat = findSeatBySocketId(socket.id)
    if (seat) {
      updatePlayerBankroll(seat.player, seat.stack)
    }

    delete players[socket.id]
    removeFromTables(socket.id)

    socket.broadcast.emit('tables_updated', tables)
    socket.broadcast.emit('players_updated', players)
  })

  async function updatePlayerBankroll(player, amount) {
    const user = await db.User.findById(player.id)
    await db.User.update(
      { bankroll: user.bankroll + amount },
      { where: { id: player.id } }
    )
    players[socket.id].bankroll = user.bankroll + amount
    io.to(socket.id).emit('players_updated', players)
  }

  async function saveHandHistory(table) {
    const seats = Object.keys(table.seats).map(seatId => table.seats[seatId])
    const players = seats.filter(seat => seat != null).map(seat => seat.player)

    const hand = await db.Hand.create({
      history: JSON.stringify(table.history),
    })
    await db.UserHand.bulkCreate(
      players.map(player => ({
        user_id: player.id,
        hand_id: hand.id,
      }))
    );
  }

  function findSeatBySocketId(socketId) {
    let foundSeat = null
    Object.values(tables).forEach(table => {
      Object.values(table.seats).forEach(seat => {
        if(seat && seat.player.socketId === socketId) {
          foundSeat = seat
        }
      })
    })
    return foundSeat
  }

  function removeFromTables(socketId) {
    for (let i = 0; i < Object.keys(tables).length; i++) {
      tables[Object.keys(tables)[i]].removePlayer(socketId)
    }
  }

  function broadcastToTable(table, message = null, from = null) {
    for (let i = 0; i < table.players.length; i++) {
      let socketId = table.players[i].socketId
      let tableCopy = hideOpponentCards(table, socketId)
      io.to(socketId).emit('table_updated', { table: tableCopy, message, from })
    }
  }

  function changeTurnAndBroadcast(table, seatId) {
    setTimeout(() => {
      table.changeTurn(seatId)
      broadcastToTable(table)
          
      if (table.handOver) {
        saveHandHistory(table)
        initNewHand(table)
      }
    }, 1000)
  }

  function initNewHand(table) {
    table.clearWinMessages()
    if (table.activePlayers().length > 1) {
      broadcastToTable(table, '---New hand starting in 5 seconds---')
    }
    setTimeout(() => {
      table.startHand()
      broadcastToTable(table)      
    }, 5000)
  }

  function clearForOnePlayer(table) {
    saveHandHistory(table)

    table.clearWinMessages()
    setTimeout(() => {
      table.clearSeatHands()
      table.resetBoardAndPot()
      broadcastToTable(table, 'Waiting for more players')
    }, 5000)
  }

  function hideOpponentCards(table, socketId) {
    let tableCopy = JSON.parse(JSON.stringify(table))
    let hiddenCard = { suit: 'hidden', rank: 'hidden'}
    let hiddenHand = [hiddenCard, hiddenCard]

    for (let i = 1; i <= tableCopy.maxPlayers; i++) {
      let seat = tableCopy.seats[i]
      if (
        seat &&
        seat.hand.length > 0 &&
        seat.player.socketId !== socketId &&
        !(seat.lastAction === 'WINNER' && tableCopy.wentToShowdown) 
      ) {
        seat.hand = hiddenHand
      }
    }
    return tableCopy
  }
})

db.sequelize.sync()
server.listen(process.env.PORT)