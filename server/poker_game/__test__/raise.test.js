var expect = require('chai').expect

var Table = require('../table')
var Player = require('../player')

function getHighCards() {
  const suits = ['spades', 'diamonds', 'hearts', 'clubs']
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

describe('Table.handleRaise', () => {
  let table
  let player1
  let player2
  
  beforeEach(() => {
    table = new Table(1, 'Test table', 6, 10)
    player1 = new Player('1', 1, 'Byron', 100)
    player2 = new Player('2', 2, 'Alice', 100)

    table.sitPlayer(player1, 1, 10)
    table.sitPlayer(player2, 2, 10)
    table.startHand()
  })

  it('places the blinds', () => {
    expect(table.seats[1].bet).to.be.equal(table.limit/100)
    expect(table.seats[2].bet).to.be.equal(table.limit/200)
  })

  describe('when someone raises', () => {
    const raiseAmount = 3

    beforeEach(() => {
      table.handleRaise('1', raiseAmount)
    })
    it('their stack loses the amount', () => {
      expect(table.seats[1]).to.have.property('stack', 10 - raiseAmount)
    })
    it('they have a bet of the raise amount', () => {
      expect(table.seats[1].bet).to.be.equal(raiseAmount)
    })
    it('the pot increases by the raise amount', () => {
      expect(table.pot).to.be.equal(raiseAmount + table.seats[2].bet)
    })
    it('the new call amount is the raise amount', () => {
      expect(table.callAmount).to.be.equal(raiseAmount)
    })
  })

  describe('when a player is all in', () => {
    beforeEach(() => {
      const raiseAmount = 10
      table.handleRaise('2', raiseAmount)
      table.changeTurn(2)
    })
    
    it('the big blind has not acted yet', () => {
      expect(table.seats[1].bet).to.be.equal(0.1)
      expect(table.seats[1].stack).to.be.equal(9.9)
    })
    
    it("all of the player's chips are bet", () => {
      expect(table.seats[2].bet).to.be.equal(10)
      expect(table.seats[2].stack).to.be.equal(0)
    })

    describe('and the other player folds', () => {
      beforeEach(() => {
        table.seats[1].stack = 4.9
        table.handleFold('1')
        table.changeTurn(1)
      })

      it('the all in player wins the pot', () => {
        expect(table.seats[1].stack).to.be.equal(4.9)
        expect(table.seats[2].stack).to.be.equal(10.1)
      })
    })
    
    describe('and the other player calls with more chips and loses', () => {
      beforeEach(() => {
        table.seats[1].hand = getSevenDeuce()
        table.seats[2].hand = getAceKing()
        getHighCards().concat[table.deck]        

        table.seats[1].stack = 19.9
        table.handleCall('1')
        table.changeTurn(1)
      })

      it('the all in player only wins as much as they started with', () => {
        expect(+(table.seats[1].stack).toFixed(2)).to.be.equal(10)
        expect(+(table.seats[2].stack).toFixed(2)).to.be.equal(20)
      })

      describe('starting a new hand afterwards', () => {
        beforeEach(() => {
          table.startHand()
        })

        it('the sidepots are reset', () => {
          expect(table.sidePots).to.have.lengthOf(0)
        })

        it('the blinds rotate and are places', () => {
          expect(+(table.seats[1].stack).toFixed(2)).to.be.equal(9.95)
          expect(+(table.seats[2].stack).toFixed(2)).to.be.equal(19.9)
          expect(+(table.pot).toFixed(2)).to.be.equal(0.15)
        })
      })
    })
    
    describe('and the other player calls with less chips and loses', () => {
      beforeEach(() => {
        table.seats[1].hand = getSevenDeuce()
        table.seats[2].hand = getAceKing()
        table.deck.cards = getHighCards()

        table.seats[1].stack = 4.9
        table.handleCall('1')
        table.changeTurn(1)
      })

      it('the pot is the sum of their starting stacks', () => {
        expect(table.pot).to.be.equal(10)
      })

      it('there is a sidepot', () => {
        expect(table.sidePots).to.have.lengthOf(1)
        expect(table.sidePots[0]).to.have.property('amount', 5)
      })

      it('the all in player wins the entire pot', () => {
        expect(table.seats[1].stack).to.be.equal(0)
        expect(table.seats[2].stack).to.be.equal(15)
      })
    })

    describe('and the other player calls with less chips and wins', () => {
      beforeEach(() => {
        table.seats[1].hand = getAceKing()
        table.seats[2].hand = getSevenDeuce()
        table.deck.cards = getHighCards()

        table.seats[1].stack = 4.9
        table.handleCall('1')
        table.changeTurn(1)
      })

      it('the other player only wins as much as they started with', () => {
        expect(table.seats[1].stack).to.be.equal(10)
        expect(table.seats[2].stack).to.be.equal(5)
      })
    })
  })
})