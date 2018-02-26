var expect = require('chai').expect

var Table = require('../table')
var Player = require('../player')

describe('When the winner is determined', () => {
  let table
  let player1
  let player2
  const raiseAmount = 5

  beforeEach(() => {
    table = new Table(1, 'Test table', 6, 10)
    player1 = new Player('1', 1, 'Byron', 100)
    player2 = new Player('2', 2, 'Alice', 100)

    table.sitPlayer(player1, 1, 5)
    table.sitPlayer(player2, 2, 5)
    table.startHand()
  })

  describe('a straight vs two pair', () => {
    beforeEach(() => {
      table.deck.cards = [
        { rank: 'ace', suit: 'diamonds' },
        { rank: '5', suit: 'diamonds' },
        { rank: '2', suit: 'spades' },
        { rank: '8', suit: 'hearts' },
        { rank: '9', suit: 'hearts' },       
      ]
      table.seats[1].hand = [
        { rank: 'ace', suit: 'spades' },
        { rank: '5', suit: 'spades' },
      ]
      table.seats[2].hand = [
        { rank: '3', suit: 'clubs' },
        { rank: '4', suit: 'clubs' },
      ]
      table.handleRaise('2', raiseAmount)
      table.changeTurn(2)
      table.handleCall('1')
      table.changeTurn(1)
    })
    it('the player with the straight wins', () => {
      expect(+(table.seats[1].stack).toFixed(2)).to.be.equal(0)
      expect(+(table.seats[2].stack).toFixed(2)).to.be.equal(10)
    })
  })

  describe('two pair vs two pair', () => {
    beforeEach(() => {
      table.deck.cards = [
        { rank: 'ace', suit: 'diamonds' },
        { rank: '5', suit: 'diamonds' },
        { rank: '3', suit: 'spades' },
        { rank: '4', suit: 'hearts' },
        { rank: 'jack', suit: 'hearts' },
      ]
      table.seats[1].hand = [
        { rank: 'ace', suit: 'spades' },
        { rank: '5', suit: 'spades' },
      ]
      table.seats[2].hand = [
        { rank: '3', suit: 'clubs' },
        { rank: '4', suit: 'clubs' },
      ]
      table.handleRaise('2', raiseAmount)
      table.changeTurn(2)
      table.handleCall('1')
      table.changeTurn(1)
    })
    it('the player with the higher two pair wins', () => {
      expect(+(table.seats[1].stack).toFixed(2)).to.be.equal(10)
      expect(+(table.seats[2].stack).toFixed(2)).to.be.equal(0)
    })
  })
})