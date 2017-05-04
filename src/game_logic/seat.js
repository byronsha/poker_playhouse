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
  }
  check() {
    this.checked = true
    this.lastAction = 'CHECK'
  }
  raise(amount, isBlind = false) {
    this.stack -= (amount - this.bet)
    this.bet = amount

    if (!isBlind) {
      this.lastAction = 'RAISE'
    }
  }
  callRaise(amount) {
    this.stack = this.stack - (amount - this.bet) < 0 ? 0 : this.stack - (amount - this.bet)
    this.bet = amount > this.stack ? this.stack : amount
    this.lastAction = 'CALL'
  }
  winHand(amount) {
    this.bet = 0
    this.stack += amount
    this.turn = false
    this.lastAction = 'WINNER'
  }
}

module.exports = Seat