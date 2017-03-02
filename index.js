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
  constructor(id, name, bankroll) {
    this.id = id,
    this.name = name,
    this.bankroll = bankroll
  }
}

class Table {
  constructor(id, name) {
    this.id = id,
    this.name = name,
    this.players = []
  }
  addPlayer(player) {
    this.players.push(player)
  }
  removePlayer(id) {
    this.players = this.players.filter((player) => {
      player.id === id
    })
  }
}

const tables = {}
const players = {}

io.on('connection', socket => {
  socket.on('message', body => {
    socket.broadcast.emit('message', {
      body,
      from: socket.id.slice(8)
    })
  })

  socket.on('join_lobby', playerName => {
    const playerId = randomId(20)

    players[playerId] = new Player(playerId, playerName, 50000)
    
    socket.emit('lobby_joined', {
      player: players[playerId],
      tables,
      players
    })
  })

  socket.on('create_table', (tableName, player) => {
    const tableId = randomId(20)

    tables[tableId] = new Table(tableId, tableName)

    player = {
      player,
      stack: 5000
    }

    tables[tableId].addPlayer(player)

    socket.emit('table_created', table[tableId])
  })

  socket.on('join_table', (tableId, player) => {
    tables[tableId].addPlayer(player)

    socket.emit('table_joined', table[tableId])
  })
})

server.listen(9000)
