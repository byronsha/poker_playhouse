var expect = require('chai').expect

var Table = require('../table')
var Player = require('../player')

function getAcesAndKings() {
  const suits = ['diamonds', 'hearts', 'clubs']
  const kings = suits.map(suit => ({
    rank: 'king', suit: suit
  }))
  const aces = suits.map(suit => ({
    rank: 'ace', suit: suit
  }))
  return aces.concat(kings)
}
function getAceKing(suit) {
  return [
    { rank: 'ace', suit: suit },
    { rank: 'king', suit: suit }
  ]
}
function getSevenDeuce(suit) {
  return [
    { rank: '7', suit: suit },
    { rank: '2', suit: suit }
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
      table.seats[1].hand = getAceKing('spades')
      table.seats[2].hand = getSevenDeuce('spades')
      table.seats[3].hand = getSevenDeuce('hearts')
      table.deck.cards = getAcesAndKings()
      
      table.handleRaise('2', 8)
      table.changeTurn(2)
      table.handleRaise('3', 10)
      table.changeTurn(3)
      table.handleCall('1')
      table.changeTurn(1)
    })

    it('the short stack wins the main pot and the others chop', () => {
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

describe('A 4 handed game', () => {
  let table
  let player1
  let player2
  let player3
  let player4

  beforeEach(() => {
    table = new Table(1, 'Test table', 6, 10)
    player1 = new Player('1', 1, 'Byron', 100)
    player2 = new Player('2', 2, 'Alice', 100)
    player3 = new Player('3', 3, 'Sandy', 100)
    player4 = new Player('4', 4, 'Robert', 100)
  
    table.sitPlayer(player1, 1, 5)
    table.sitPlayer(player2, 2, 8)
    table.sitPlayer(player3, 3, 10)
    table.sitPlayer(player4, 4, 20)
    table.startHand()
  })

  describe('everyone is all in', () => {
    beforeEach(() => {
      table.seats[1].hand = getAceKing('spades')
      table.seats[2].hand = getSevenDeuce('spades')
      table.seats[3].hand = getSevenDeuce('hearts')
      table.seats[4].hand = getAceKing('hearts')
      table.deck.cards = getAcesAndKings()

      table.handleRaise('2', 8)
      table.changeTurn(2)
      table.handleRaise('3', 10)
      table.changeTurn(3)
      table.handleRaise('4', 20)
      table.changeTurn(4)
      table.handleCall('1')
      table.changeTurn(1)
    })

    it('the board runs out', () => {
      expect(table.board).to.have.lengthOf(5)
    })
    it('the pots have the correct amounts', () => {
      expect(table.pot).to.be.equal(20)
      expect(table.sidePots[0].amount).to.be.equal(9)
      expect(table.sidePots[1].amount).to.be.equal(4)
      expect(table.sidePots[2].amount).to.be.equal(10)
    })
    it('the pots go to the correct players', () => {
      expect(table.seats[1].stack).to.be.equal(10)
      expect(table.seats[2].stack).to.be.equal(0)
      expect(table.seats[3].stack).to.be.equal(0)
      expect(table.seats[4].stack).to.be.equal(33)
    })
    it('the felted players are sitting out', () => {
      expect(table.seats[2].sittingOut).to.be.true
      expect(table.seats[3].sittingOut).to.be.true
    })
    it('the hand is over', () => {
      expect(table.handOver).to.be.true
    })
  })

  it('the pot is equal to the blinds', () => {
    expect(+table.pot.toFixed(2)).to.be.equal(0.15)
  })
  it('two players are in the blinds', () => {
    expect(table.seats[3].bet).to.be.equal(0.05)
    expect(table.seats[4].bet).to.be.equal(0.1)
  })
  it('the player to act is on the button', () => {
    expect(table.turn).to.be.equal(1)
    expect(table.seats[1].bet).to.be.equal(0)
    expect(table.seats[1].turn).to.be.true
    expect(table.seats[2].bet).to.be.equal(0)
    expect(table.seats[2].turn).to.be.false
  })
})