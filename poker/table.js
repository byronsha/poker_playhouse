const _ = require('underscore')
const Seat = require('./seat.js')
const Deck = require('./deck.js')
const PokerHand = require('./pokerhand.js')

class Table {
  constructor(id, name, maxPlayers, limit) {
    this.id = id
    this.name = name
    this.maxPlayers = maxPlayers
    this.limit = limit
    this.players = []
    this.seats = this.initSeats(maxPlayers)
    this.board = []
    this.deck = null
    this.button = null
    this.turn = null
    this.pot = 0
    this.callAmount = null
    this.minBet = this.limit / 200
    this.minRaise = this.limit / 100
    this.smallBlind = null
    this.bigBlind = null
    this.handOver = true
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
    this.seats[seatId] = new Seat(seatId, player, this.limit)
    
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
  getNextSatPlayer(player, places) {
    let i = 0
    let current = player
    
    while (i < places) {
      if (current === this.maxPlayers) {
        current = 0
      } else {
        current++
      }
 
      if (this.seats[current]) {
        i++
      }
    }

    return current
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
  changeTurn(lastTurn) {
    this.checkHandOver()

    if (this.allCheckedOrCalled()) {
      this.dealNextStreet()
      if (this.handOver) {
        this.turn = null
      } else {
        this.turn = this.smallBlind
      }
    } else {
      this.turn = this.getNextUnfoldedPlayer(lastTurn, 1)
    }

    for (let i = 1; i < this.maxPlayers; i++) {
      if (this.seats[i] && i === this.turn) {
        this.seats[i].turn = true
      } else if (this.seats[i]) {
        this.seats[i].turn = false
      }
    }
  }
  unfoldPlayers() {
    for (let i = 1; i < this.maxPlayers; i++) {
      if (this.seats[i]) {
        this.seats[i].folded = false
        this.seats[i].checked = false
      }
    }
  }
  startHand() {
    this.handOver = false
    this.deck = new Deck()
    this.unfoldPlayers()
    this.minRaise *= 2

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
              seat.raise(this.limit / 100)
              this.pot += this.limit / 100
              this.callAmount = this.limit / 100
              this.bigBlind = currentSeat
            } else {
              seat.raise(this.limit / 200)
              this.pot += this.limit / 200
              this.smallBlind = currentSeat
            }
          } else if (blinds === 1) {
            // big blind
            if (this.unfoldedPlayers().length === 2) {
              seat.raise(this.limit / 200)
              this.pot += this.limit / 200
              this.smallBlind = currentSeat
            } else {
              seat.raise(this.limit / 100)
              this.pot += this.limit / 100
              this.callAmount = this.limit / 100
              this.bigBlind = currentSeat
            }
          }
          blinds++
        }
      }
    }
  }
  clearHand() {
    this.handOver = true
    this.deck = null
    this.board = []
    this.pot = 0
    this.callAmount = null
    this.minRaise = this.limit / 100
    this.smallBlind = null
    this.bigBlind = null
    this.clearSeatHands()
  }
  clearSeatHands() {
    for (let i = 1; i <= this.maxPlayers; i++) {
      if (this.seats[i]) {
        this.seats[i].hand = []
      }
    }
  }
  clearSeatTurns() {
    for (let i = 1; i <= this.maxPlayers; i++) {
      if (this.seats[i]) {
        this.seats[i].turn = false
      }
    }
  }
  checkHandOver() {
    const satPlayers = this.satPlayers()
    const unfoldedPlayers = this.unfoldedPlayers()

    if (satPlayers.length === 1) {
      satPlayers[0].winHand(this.pot)
      this.button = satPlayers[0].id
      this.handOver = true
      this.clearHand()
    }

    if (unfoldedPlayers.length === 1) {
      unfoldedPlayers[0].winHand(this.pot)
      this.button = this.getNextSatPlayer(this.button, 1)
      this.handOver = true
      this.clearHand()
    }
  }
  checkTableEmpty() {
    if (this.satPlayers().length === 0) {
      this.button = null
      this.turn = null
      this.clearHand()
    }
  }
  allCheckedOrCalled() {
    console.log(this)
    console.log(this.seats)
    console.log(this.bigBlind)
    console.log(this.seats[this.bigBlind])

    if (this.seats[this.bigBlind].bet === this.limit / 100 && !this.seats[this.bigBlind].checked) {
      return false
    }

    for (let i = 1; i <= this.maxPlayers; i++) {
      if (this.seats[i] && !this.seats[i].folded) {
        if (!this.seats[i].checked && this.callAmount && this.seats[i].bet !== this.callAmount) {
          return false
        } else if (this.seats[i].checked && this.callAmount && this.seats[i].bet !== this.callAmount) {
          return false
        } else if (!this.callAmount && !this.seats[i].checked) {
          return false
        }
      }
    }
    return true
  }
  dealNextStreet() {
    this.resetBets()
    if (this.board.length === 0) {
      this.dealFlop()
    } else if (this.board.length === 3 || this.board.length === 4) {
      this.dealTurnOrRiver()
    } else if (this.board.length === 5) {
      this.determineWinner()
    }
  }
  determineWinner() {
    let winners = []
    let highScore = 0

    for (let i = 1; i < this.maxPlayers; i++) {
      if (this.seats[i]) {
        const hand = PokerHand.score(this.seats[i].hand, this.board)

        if (hand.value > highScore) {
          winners = [i]
          highScore = hand.value
        } else if (hand.value === highScore) {
          winners.push(i)
        }
      }
    }

    for (let i = 0; i < winners.length; i++) {
      this.seats[winners[i]].winHand(this.pot / winners.length)
    }

    this.pot = 0
    this.button = this.getNextSatPlayer(this.button, 1)
    this.clearSeatTurns()
    this.handOver = true
  }
  resetBets() {
    for (let i = 1; i < this.maxPlayers; i++) {
      if (this.seats[i]) {
        this.seats[i].bet = 0
        this.seats[i].checked = false
      }
    }
    this.callAmount = null
    this.minRaise = this.limit / 200
  }
  dealFlop() {
    for (let i = 0; i < 3; i++) {
      this.board.push(this.deck.draw())
    }
  }
  dealTurnOrRiver() {
    this.board.push(this.deck.draw())
  }
  findPlayerBySocketId(socketId) {
    for (let i = 1; i <= this.maxPlayers; i++) {
      if (this.seats[i] && this.seats[i].player.socketId === socketId) {
        return this.seats[i]
      }
    }
    throw new Error('seat not found!')
  }
}

module.exports = Table