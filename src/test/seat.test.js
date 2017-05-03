var expect = require('chai').expect
var should = require('chai').should()
var Seat = require('../game_logic/seat')

describe('Seat', function() {
  describe('initialization', () => {
    let id = '123456',
      player = { name: 'Byron' },
      stack = 100

    let seat = new Seat(id, player, stack)

    it('has correct id', () => {
      expect(seat.id).to.be.equal('123456')
    })
    it('has correct player', () => {
      expect(seat.player).to.have.property('name', 'Byron')
    })
    it('has correct stack', () => {
      expect(seat.stack).to.be.equal(100)
    })
  })

  describe('#raise()', () => {
    let id = '123456',
      player = { name: 'Byron' },
      stack = 100

    let seat = new Seat(id, player, stack)
    seat.raise(20, true)

    it('subtracts from the stack', () => {
      expect(seat.stack).to.be.equal(80)
    })
    it('doesn\'t change the last action for blind raises', () => {
      expect(seat.lastAction).to.be.equal(null)
    })
  })
})