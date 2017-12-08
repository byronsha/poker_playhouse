class Seat {
  constructor(id, player, buyin, stack) {
    this.id = id
    this.player = player
    this.buyin = buyin
    this.stack = stack
    this.hand = []
    this.bet = 0
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

    this.bet = amount

    this.stack -= reRaiseAmount
    this.player.bankroll -= reRaiseAmount

    this.turn = false
    this.lastAction = 'RAISE'
  }
  placeBlind(amount) {
    this.bet = amount

    this.stack -= amount
    this.player.bankroll -= amount
  }
  callRaise(amount) {
    const amountToCall = amount - this.bet
    const amountCalled = Math.min(this.stack, amountToCall)

    this.bet += amountCalled

    this.stack -= amountCalled
    this.player.bankroll -= amountCalled
    
    this.turn = false
    this.lastAction = 'CALL'
  }
  winHand(amount) {
    this.bet = 0

    this.stack += amount
    this.player.bankroll += amount

    this.turn = false
    this.lastAction = 'WINNER'
  }
}

module.exports = Seat