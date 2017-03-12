const express = require('express')
const _ = require('underscore')
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

class Deck {
  constructor() {
    this.cards = this.initCards()
  }
  initCards() {
    const suits = 'sdhc'.split('')
    const values = '23456789TJQKA'.split('')
    let cards = []

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < values.length; j++) {
        cards.push(values[j] + suits[i])
      }
    }

    this.shuffle(cards)
    return cards
  }
  shuffle(cards) {
    // Fisher-Yates (aka Knuth) Shuffle
    var currentIndex = cards.length, tempCard, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempCard = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = tempCard;
    }

    return cards;
  }
  deal() {
    const dealtCard = this.cards.pop()
    return dealtCard
  }
}

class Seat {
  constructor(player, stack) {
    this.player = player,
    this.hand = [],
    this.bet = 0,
    this.stack = stack,
    this.turn = false,
    this.folded = true
  }
  placeBet(amount) {
    this.bet += amount,
    this.stack -= amount
  }
  winHand(pot) {
    this.bet = 0
    this.hand = []
    this.stack += pot
    this.turn = false
  }
  loseHand() {
    this.bet = 0
    this.hand = []
    this.turn = false
  }
}

class Table {
  constructor(id, name, maxPlayers, limit) {
    this.id = id,
    this.name = name,
    this.maxPlayers = maxPlayers,
    this.limit = limit,
    this.players = [],
    this.seats = this.initSeats(maxPlayers),
    this.board = null,
    this.deck = null,
    this.turn = null,
    this.pot = 0
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
    
    for (let i = 1; i <= this.maxPlayers; i++) {
      if (this.seats[i] && this.seats[i].player.socketId === socketId) {
        this.seats[i] = null
      }
    }

    this.checkHandOver()
    this.checkTableEmpty()
  }
  sitPlayer(player, seatId) {
    this.seats[seatId] = new Seat(player, this.limit)
    
    if (!this.turn) {
      this.turn = seatId
    }
    
    if (this.satPlayers().length >= 2) {
      this.startHand()
    }
  }
  satPlayers() {
    return Object.values(this.seats).filter(seat => seat !== null)
  }
  unfoldedPlayers () {
    return Object.values(this.seats).filter(seat => seat !== null && !seat.folded)
  }
  startHand() {
    this.deck = new Deck()
    const arr = _.range(1, this.maxPlayers + 1)
    let order = arr.slice(this.turn - 1).concat(arr.slice(0, this.turn))
    let blinds = 0

    // deal cards to seated players
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < arr.length; j++) {
        const currentSeat = order[j]

        if (this.seats[currentSeat]) {
          const seat = this.seats[currentSeat]
          const dealtCard = this.deck.deal()
          seat.folded = false
          seat.hand.push(dealtCard)

          if (currentSeat === parseInt(this.turn)) {
            seat.turn = true
          }

          if (blinds === 0) {
            seat.placeBet(this.limit / 200)
            this.pot += this.limit / 200
          } else if (blinds === 1) {
            seat.placeBet(this.limit / 100)
            this.pot += this.limit / 100
          }
          blinds++
        }
      }
    }
  }
  clearHand() {
    this.deck = null
    this.board = null
    this.pot = 0
  }
  checkHandOver() {
    if (this.satPlayers().length === 1) {
      this.satPlayers()[0].winHand(this.pot)
      
      for (let i = 1; i <= Object.keys(this.seats).length; i++) {
        if (this.seats[i]) {
          this.turn = i
        }
      }
      
      this.clearHand()
    }
    if (this.unfoldedPlayers().length === 1) {
      this.unfoldedPlayers()[0].winHand(this.pot)

      let nextTurn = this.turn === this.maxPlayers ? 1 : this.turn + 1

      while (!this.seats[nextTurn]) {
        if (nextTurn === this.maxPlayers) {
          nextTurn = 1
        } else {
          nextTurn++
        }
      }

      this.turn = nextTurn
      this.clearHand()
    }
  }
  checkTableEmpty() {
    if (this.satPlayers().length === 0) {
      this.turn = null,
      this.clearHand()
    }
  }
}

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

  socket.on('sit_down', ({ tableId, seatId }) => {
    const table = tables[tableId]
    table.sitPlayer(players[socket.id], seatId)

    // const satPlayers = Object.values(table.seats).filter(seat => seat !== null)

    // if (satPlayers.length >= 2) {
    //   table.startHand()
    // }

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
      io.to(table.players[i].socketId).emit('table_updated', table)
    }
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