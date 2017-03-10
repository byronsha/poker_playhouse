const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.static(__dirname + '/public'))
app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(bodyParser.urlencoded({ extended: false }))

class Player {
  constructor(socketId, name, bankroll) {
    this.socketId = socketId,
    this.name = name,
    this.bankroll = bankroll
  }
}

class Table {
  constructor(id, name, maxPlayers, limit) {
    this.id = id,
    this.name = name,
    this.maxPlayers = maxPlayers,
    this.limit = limit,
    this.players = [],
    this.seats = this.initSeats(maxPlayers)
  }
  initSeats(maxPlayers) {
    const seats = {}
    for (let i = 1; i <= maxPlayers; i++) {
      seats[i] = null
    }
    return seats
  }
  addPlayer(player) {
    this.players.push(player)
  }
  removePlayer(socketId) {
    this.players = this.players.filter(player => player.socketId !== socketId)
    
    for (let i = 0; i < this.maxPlayers; i++) {
      if (this.seats[i] && this.seats[i].player.socketId === socketId) {
        this.seats[i] = null
      }
    }
  }
  sitPlayer(player, seatId) {
    this.seats[seatId] = {
      player,
      stack: this.limit * 100
    }
  }
}

const tables = {}
const players = {}

tables[1] = new Table(1, 'Table 1', 6, 25)
tables[2] = new Table(2, 'Table 2', 9, 25)

io.on('connection', socket => {
  // socket.on('message', body => {
  //   socket.broadcast.emit('message', {
  //     body,
  //     from: socket.id.slice(8)
  //   })
  // })

  socket.on('fetch_lobby_info', () => {
    socket.emit('receive_lobby_info', {
      tables,
      players
    })
  })

  socket.on('join_lobby', playerName => {
    players[socket.id] = new Player(socket.id, playerName, 50000)
    
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

  socket.on('sit_down', ({ tableId, seatId }) => {
    const table = tables[tableId]

    table.sitPlayer(players[socket.id], seatId)
    
    for (let i = 0; i < table.players.length; i++) {
      io.to(table.players[i].socketId).emit('table_updated', table)
    }
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
})

server.listen(9000)
