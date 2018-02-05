var expect = require('chai').expect

var Table = require('../table')
var Player = require('../player')

function getHighCards() {
  const suits = ['diamonds', 'hearts', 'clubs']
  const kings = suits.map(suit => ({
    rank: 'king', suit: suit
  }))
  const aces = suits.map(suit => ({
    rank: 'ace', suit: suit
  }))
  return aces.concat(kings)
}
function getAceKing() {
  return [
    { rank: 'ace', suit: 'spades' },
    { rank: 'king', suit: 'spades' }
  ]
}
function getSevenDeuce() {
  return [
    { rank: '7', suit: 'spades' },
    { rank: '2', suit: 'spades' }
  ]
}

describe('A 3 handed game', () => {
  const table = new Table(1, 'Test table', 6, 10)
  const player1 = new Player('1', 1, 'Byron', 100)
  const player2 = new Player('2', 2, 'Alice', 100)
  const player3 = new Player('3', 3, 'Sandy', 100)

  table.sitPlayer(player1, 1, 5)
  table.sitPlayer(player2, 2, 8)
  table.sitPlayer(player3, 3, 10)
  table.startHand()

  describe('everyone is all in', () => {
    beforeEach(() => {
      table.seats[1].hand = getAceKing()
      table.seats[2].hand = getSevenDeuce()
      table.seats[3].hand = getSevenDeuce()
      table.deck.cards = getHighCards()
      
      table.handleRaise('2', 8)
      table.changeTurn(2)
      table.handleRaise('3', 10)
      table.changeTurn(3)
      table.handleCall('1')
      table.changeTurn(1)
    })

    it('the short stack wins the main pot', () => {
      expect(table.pot).to.be.equal(15)
      expect(table.seats[1].stack).to.be.equal(15)
      expect(table.seats[2].stack).to.be.equal(3)
      expect(table.seats[3].stack).to.be.equal(5)
    })
  })

  it('the pot is equal to the blinds', () => {
    expect(+table.pot.toFixed(2)).to.be.equal(0.15)
  })
  it('two players are in the blinds', () => {
    expect(table.seats[3].bet).to.be.equal(0.05)
    expect(table.seats[1].bet).to.be.equal(0.1)
  })
  it('the player to act is on the button', () => {
    expect(table.turn).to.be.equal(2)
    expect(table.seats[2].bet).to.be.equal(0)
    expect(table.seats[2].turn).to.be.true
  })
})