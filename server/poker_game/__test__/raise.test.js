var expect = require('chai').expect

var Table = require('../table')
var Player = require('../player')

describe('Table.handleRaise', () => {
  let table
  let player1
  let player2
  
  beforeEach(() => {
    table = new Table(1, 'Test table', 6, 10)
    player1 = new Player('123abc', 1, 'Byron', 100)
    player2 = new Player('234bcd', 2, 'Alice', 100)

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
      table.handleRaise('123abc', raiseAmount)
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

  // TODO ***
  //
  // describe('when a player is all in', () => {
  //   beforeEach(() => {
  //     const raiseAmount = 10
  //     table.seats[1].stack = 5
  //     table.handleRaise(2, raiseAmount)
  //     table.changeTurn(2)
  //     table.handleCall('123abc')
  //     table.changeTurn(1)
  //   })
  //   it('the shortstack player can only win the main pot', () => {
  //     expect
  //   })
  // })
})