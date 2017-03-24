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
  }
  raise(amount) {
    this.stack -= (amount - this.bet)
    this.bet = amount
  }
  check() {
    this.checked = true
  }
  callRaise(amount) {
    this.stack -= (amount - this.bet)
    this.bet = amount
  }
  fold() {
    this.bet = 0
    this.folded = true
  }
  winHand(amount) {
    this.bet = 0
    this.stack += amount
    this.turn = false
  }
}

module.exports = Seat