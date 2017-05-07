const _ = require('underscore')
const Seat = require('./seat.js')
const Deck = require('./deck.js')
const PokerHand = require('./pokerhand.js')

class Table {
  constructor(id, name, maxPlayers, limit) {
    this.id = parseInt(id)
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
    this.mainPot = 0
    this.winMessages = []
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
    
    if (this.satPlayers().length === 1) {
      this.button = seatId
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
      current = current === this.maxPlayers ? 1 : current + 1
      if (this.seats[current]) i++
    }
    return current
  }
  getNextUnfoldedPlayer(player, places) {
    let i = 0
    let current = player

    while (i < places) {
      current = current === this.maxPlayers ? 1 : current + 1
      let currentSeat = this.seats[current]

      if (currentSeat && !currentSeat.folded && currentSeat.stack > 0) i++
    }
    return current
  }
  changeTurn(lastTurn) {
    this.checkHandOver()

    if (this.allAllIn()) {
      while (this.board.length < 5) {
        this.dealNextStreet()
      }
      this.dealNextStreet()
    }

    if (this.allCheckedOrCalled()) {
      this.dealNextStreet()
      if (this.handOver) {
        this.turn = null
      } else {
        this.turn = this.getNextUnfoldedPlayer(this.button, 1)
      }
    } else {
      this.turn = this.getNextUnfoldedPlayer(lastTurn, 1)
    }

    for (let i = 1; i <= this.maxPlayers; i++) {
      if (this.seats[i] && i === this.turn) {
        this.seats[i].turn = true
      } else if (this.seats[i]) {
        this.seats[i].turn = false
      }
    }
  }
  unfoldPlayers() {
    for (let i = 1; i <= this.maxPlayers; i++) {
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
    this.callAmount = null
    this.smallBlind = null
    this.bigBlind = null

    if (this.unfoldedPlayers().length <= 3) {
      this.turn = this.button
    } else {
      this.turn = this.getNextUnfoldedPlayer(this.button, 3)
    }

    this.dealPreflop()
    this.setBlinds()
  }
  setBlinds() {
    const unfoldedPlayers = this.unfoldedPlayers()

    if (unfoldedPlayers.length === 2) {
      this.smallBlind = this.button
      this.bigBlind = this.getNextUnfoldedPlayer(this.button, 1)
    } else {
      this.smallBlind = this.getNextUnfoldedPlayer(this.button, 1)
      this.bigBlind = this.getNextUnfoldedPlayer(this.button, 2)
    }

    this.seats[this.smallBlind].placeBlind(this.limit / 200)
    this.pot += this.limit / 200

    this.seats[this.bigBlind].placeBlind(this.limit / 100)
    this.pot += this.limit / 100

    this.callAmount = this.limit / 100
  }
  clearHand() {
    this.handOver = true
    this.deck = null
    this.board = []
    this.pot = 0
    this.mainPot = 0
    this.minRaise = this.limit / 100
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
  clearWinMessages() {
    this.winMessages = []
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
    if (this.seats[this.bigBlind].bet === this.limit / 100
      && !this.seats[this.bigBlind].checked
      && this.board.length === 0)
    {
      return false
    }

    for (let i = 1; i <= this.maxPlayers; i++) {
      if (this.seats[i] && !this.seats[i].folded && this.seats[i].stack > 0) {
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
  allAllIn() {
    for (let i = 1; i <= this.maxPlayers; i++) {
      if (this.seats[i] && this.seats[i].stack > 0) {
        return false
      }
    }
    return true
  }
  dealNextStreet() {
    this.resetBetsAndActions()
    this.mainPot = this.pot
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

    for (let i = 1; i <= this.maxPlayers; i++) {
      if (this.seats[i]) {
        let hand = PokerHand.score(this.seats[i].hand, this.board)

        if (hand.value > highScore) {
          winners = [[i, hand]]
          highScore = hand.value
        } else if (hand.value === highScore) {
          winners.push([i, hand])
        }
      }
    }

    for (let i = 0; i < winners.length; i++) {
      let seat = this.seats[winners[i][0]]
      let hand = winners[i][1]
      let winAmount = this.pot / winners.length

      seat.winHand(winAmount)
      this.winMessages.push(`${seat.player.name} wins $${winAmount.toFixed(2)} with ${hand.name}`)
    }

    this.pot = 0
    this.mainPot = 0
    this.button = this.getNextSatPlayer(this.button, 1)
    this.clearSeatTurns()
    this.handOver = true
  }
  resetBetsAndActions() {
    for (let i = 1; i <= this.maxPlayers; i++) {
      if (this.seats[i]) {
        this.seats[i].bet = 0
        this.seats[i].checked = false
        this.seats[i].lastAction = null
      }
    }
    this.callAmount = null
    this.minRaise = this.limit / 200
  }
  dealPreflop() {
    const arr = _.range(1, this.maxPlayers + 1)
    const order = arr.slice(this.button).concat(arr.slice(0, this.button))

     // deal cards to seated players
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < order.length; j++) {
        const currentSeat = order[j]

        if (this.seats[currentSeat]) {
          this.seats[currentSeat].hand.push(this.deck.draw())

          if (currentSeat === this.turn) {
            this.seats[currentSeat].turn = true
          }
        }
      }
    }
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
  handleFold(socketId) {
    let seat = this.findPlayerBySocketId(socketId)
    seat.fold()

    return {
      seatId: seat.id,
      message: `${seat.player.name} folds`
    }
  }
  handleCall(socketId) {
    let seat = this.findPlayerBySocketId(socketId)
    let addedToPot = this.callAmount > seat.stack
      ? seat.stack - seat.bet
      : this.callAmount - seat.bet

    seat.callRaise(this.callAmount)
    this.pot += addedToPot

    return {
      seatId: seat.id,
      message: `${seat.player.name} calls $${addedToPot.toFixed(2)}`
    }
  }
  handleCheck(socketId) {
    let seat = this.findPlayerBySocketId(socketId)
    seat.check()

    return {
      seatId: seat.id,
      message: `${seat.player.name} checks`
    }
  }
  handleRaise(socketId, amount) {
    let seat = this.findPlayerBySocketId(socketId)
    let addedToPot = amount - seat.bet

    seat.raise(amount)
    this.pot += addedToPot

    if (this.callAmount) {
      this.minRaise = this.callAmount + (seat.bet - this.callAmount) * 2
    } else {
      this.minRaise = seat.bet * 2
    }
    this.callAmount = amount

    return {
      seatId: seat.id,
      message: `${seat.player.name} raises to $${amount.toFixed(2)}`
    }
  }
}

module.exports = Table