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

module.exports = Seat