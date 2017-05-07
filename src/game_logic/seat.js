class Seat {
  constructor(id, player, stack) {
    this.id = id
    this.player = player
    this.hand = []
    this.bet = 0
    this.stack = stack
    this.turn = false
    this.checked = true
    this.folded = true
    this.lastAction = null
  }
  fold() {
    this.bet = 0
    this.folded = true
    this.lastAction = 'FOLD'
    this.turn = false
  }
  check() {
    this.checked = true
    this.lastAction = 'CHECK'
    this.turn = false
  }
  raise(amount) {
    this.stack -= (amount - this.bet)
    this.bet = amount
    this.lastAction = 'RAISE'
    this.turn = false
  }
  placeBlind(amount) {
    this.stack -= (amount - this.bet)
    this.bet = amount
  }
  callRaise(amount) {
    this.stack = this.stack - (amount - this.bet) < 0 ? 0 : this.stack - (amount - this.bet)
    this.bet = amount > this.stack ? this.stack : amount
    this.lastAction = 'CALL'
    this.turn = false
  }
  winHand(amount) {
    this.bet = 0
    this.stack += amount
    this.lastAction = 'WINNER'
    this.turn = false
  }
}

module.exports = Seat