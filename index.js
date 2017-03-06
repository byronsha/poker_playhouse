const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js')

const randomId = require('random-id')

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
    this.players = []
  }
  addPlayer(player) {
    if (this.players.length < this.maxPlayers) {
      this.players.push({
        player,
        stack: this.limit * 100
      })
    }
  }
  removePlayer(socketId) {
    this.players = this.players.filter(player => player.player.socketId !== socketId)
  }
}

const tables = {}
const players = {}

tables[1] = new Table(1, 'Table 1', 6, 25)
tables[2] = new Table(2, 'Table 2', 9, 25)

io.on('connection', socket => {
  socket.on('message', body => {
    socket.broadcast.emit('message', {
      body,
      from: socket.id.slice(8)
    })
  })

  socket.on('fetch_lobby_info', () => {
    socket.emit('receive_lobby_info', {
      tables,
      players
    })
  })

  socket.on('join_lobby', playerName => {
    // const playerId = randomId(20)

    players[socket.id] = new Player(socket.id, playerName, 50000)
    
    socket.emit('lobby_joined', players[socket.id])
    socket.broadcast.emit('players_updated', players)
  })

  socket.on('join_table', ({ tableId, player }) => {
    tables[tableId].addPlayer(player)

    socket.emit('table_joined', tables[tableId])
    socket.broadcast.emit('tables_updated', tables)
  })

  socket.on('leave_table', ({ player, table }) => {
    tables[table.id].removePlayer(player.socketId)

    socket.emit('table_left', player)
    socket.broadcast.emit('tables_updated', tables)    
  })

  socket.on('disconnect', () => {
    // remove player from tables and players based on socket id
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
