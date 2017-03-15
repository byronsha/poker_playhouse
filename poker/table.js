const _ = require('underscore')
const Seat = require('./seat.js')
const Deck = require('./deck.js')

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
    this.button = null,
    this.turn = null,
    this.pot = 0,
    this.callAmount = 0
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
    
    if (!this.button) {
      this.button = seatId
    }
    
    if (this.satPlayers().length >= 2) {
      this.startHand()
    }
  }
  satPlayers() {
    return Object.values(this.seats).filter(seat => seat !== null)
  }
  unfoldedPlayers() {
    return Object.values(this.seats).filter(seat => seat !== null && !seat.folded)
  }
  getNextUnfoldedPlayer(player, places) {
    let i = 0
    let current = player
    
    while (i < places) {
      if (current === this.maxPlayers) {
        current = 0
      } else {
        current++
      }
 
      if (this.seats[current] && !this.seats[current].folded) {
        i++
      }
    }

    return current
  }
  unfoldPlayers() {
    const satPlayers = this.satPlayers()
    for (let i = 0; i < satPlayers.length; i++) {
      satPlayers[i].folded = false
    }
  }
  startHand() {
    this.deck = new Deck()
    this.unfoldPlayers()

    const arr = _.range(1, this.maxPlayers + 1)
    let order = arr.slice(this.button).concat(arr.slice(0, this.button))
    let blinds = 0

    if (this.unfoldedPlayers().length <= 3) {
      this.turn = this.button
    } else {
      this.turn = this.getNextUnfoldedPlayer(this.button, 3)
    }

    // deal cards to seated players
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < arr.length; j++) {
        const currentSeat = order[j]

        if (this.seats[currentSeat]) {
          const seat = this.seats[currentSeat]
          const dealtCard = this.deck.draw()
          seat.folded = false
          seat.hand.push(dealtCard)

          if (currentSeat === parseInt(this.turn)) {
            seat.turn = true
          }

          if (blinds === 0) {
            // small blind
            if (this.unfoldedPlayers().length === 2) {
              seat.placeBet(this.limit / 100)
              this.pot += this.limit / 100
              this.callAmount = this.limit / 100
            } else {
              seat.placeBet(this.limit / 200)
              this.pot += this.limit / 200
            }
          } else if (blinds === 1) {
            // big blind
            if (this.unfoldedPlayers().length === 2) {
              seat.placeBet(this.limit / 200)
              this.pot += this.limit / 200
            } else {
              seat.placeBet(this.limit / 100)
              this.pot += this.limit / 100
              this.callAmount = this.limit / 100
            }
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
  dealFlop() {
    for (let i = 0; i < 3; i++) {
      this.board.push(this.deck.draw())
    }
  }
  dealTurn() {
    this.board.push(this.deck.draw())
  }
  dealRiver() {
    this.board.push(this.deck.draw())
  }
}

module.exports = Table