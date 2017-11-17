class Seat {
  constructor(id, player, buyin, stack) {
    this.id = id
    this.player = player
    this.hand = []
    this.bet = 0
    this.buyin = buyin
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
    const reRaiseAmount = amount - this.bet
    if (reRaiseAmount > this.stack) { return }

    this.stack -= reRaiseAmount
    this.bet = amount
    this.player.bankroll -= reRaiseAmount
    this.lastAction = 'RAISE'
    this.turn = false
  }
  placeBlind(amount) {
    this.stack -= (amount - this.bet)
    this.bet = amount
    this.player.bankroll -= (amount - this.bet)
  }
  callRaise(amount) {
    const amountToCall = amount - this.bet
    const amountCalled = Math.min(this.stack, amountToCall)

    this.bet += amountCalled
    this.stack -= amountCalled
    this.player.bankroll -= amountCalled
    this.lastAction = 'CALL'
    this.turn = false
  }
  winHand(amount) {
    this.bet = 0
    this.stack += amount
    this.player.bankroll += amount
    this.lastAction = 'WINNER'
    this.turn = false
  }
}

module.exports = Seat