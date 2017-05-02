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
  raise(amount, isBlind = false) {
    this.stack -= (amount - this.bet)
    this.bet = amount

    if (!isBlind) {
      this.lastAction = 'RAISE'
    }
  }
  check() {
    this.checked = true
    this.lastAction = 'CHECK'
  }
  callRaise(amount) {
    this.stack = this.stack - (amount - this.bet) < 0 ? 0 : this.stack - (amount - this.bet)
    this.bet = amount > this.stack ? this.stack : amount
    this.lastAction = 'CALL'
  }
  fold() {
    this.bet = 0
    this.folded = true
    this.lastAction = 'FOLD'
  }
  winHand(amount) {
    this.bet = 0
    this.stack += amount
    this.turn = false
    this.lastAction = 'WINNER'
  }
}

module.exports = Seat