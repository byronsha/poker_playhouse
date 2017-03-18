class Seat {
  constructor(id, player, stack) {
    this.id = id,
    this.player = player,
    this.hand = [],
    this.bet = 0,
    this.stack = stack,
    this.turn = false,
    this.folded = true
  }
  raise(amount) {
    this.stack -= amount
    this.bet += amount
  }
  check() {

  }
  call(amount) {
    this.stack -= (amount - this.bet)
    this.bet = amount
  }
  fold() {
    this.bet = 0
    this.folded = true
  }
  winHand(pot) {
    this.bet = 0
    this.hand = []
    this.stack += pot
    this.turn = false
  }
}

module.exports = Seat