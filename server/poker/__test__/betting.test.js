var expect = require('chai').expect

var Table = require('../table')
var Player = require('../player')

describe('Betting scenarios', () => {
  let table
  let player1
  let player2

  beforeEach(() => {
    table = new Table(1, 'Test table', 6, 10)
    player1 = new Player('socket1', 1, 'Byron', 100)
    player2 = new Player('socket2', 2, 'Alice', 100)

    table.sitPlayer(player1, 1, 10)
    table.sitPlayer(player2, 2, 5)
    table.startHand()
  })

  describe('after the hand has been started', () => {
    it('the first sat player is the big blind', () => {
      expect(table.seats[1].bet).to.be.equal(table.limit/100)
    })
  
    it('the second sat player is the small blind with the action', () => {
      expect(table.seats[2].bet).to.be.equal(table.limit/200)
      expect(table.seats[2].turn).to.be.true
      expect(table.turn).to.be.equal(2)
    })
  })

  describe('when the small blind folds preflop', () => {
    beforeEach(() => {
      table.handleFold('socket2')
      table.changeTurn(2)
    })

    it('the big blind wins $0.05', () => {
      expect(table.seats[1].stack).to.be.equal(10.05)
    })

    it('the small blind loses $0.05', () => {
      expect(table.seats[2].stack).to.be.equal(4.95)
    })

    it('the hand is over', () => {
      expect(table.handOver).to.be.true
    })
  })

  describe('when the small blind calls preflop', () => {
    beforeEach(() => {
      table.handleCall('socket2')
      table.changeTurn(2)
    })

    it('the small blind has a bet equal to the big blind', () => {
      expect(table.seats[2].bet).to.be.equal(table.seats[1].bet)
    })

    it('the small blind\'s stack decreases by the amount called', () => {
      expect(table.callAmount).to.be.equal(.1)
      expect(table.seats[2].stack).to.be.equal(4.9)
    })

    it('it is the big blind\'s turn', () => {
      expect(table.seats[1].turn).to.be.true
      expect(table.turn).to.be.equal(1)
    })
  })

  describe('when the small blind raises preflop', () => {
    beforeEach(() => {
      table.handleRaise('socket2', .3)
      table.changeTurn(2)
    })

    it('the small blind has a bet larger than the big blind', () => {
      expect(table.seats[2].bet).to.be.equal(.3)
    })

    it('the small blind\'s stack decreases by additional the amount raised', () => {
      expect(table.callAmount).to.be.equal(.3)
      expect(table.seats[2].stack).to.be.equal(4.7)
    })

    it('it is the big blind\'s turn', () => {
      expect(table.seats[1].turn).to.be.true
      expect(table.turn).to.be.equal(1)
    })
  })
})