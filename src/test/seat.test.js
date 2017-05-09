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

  describe('#fold()', () => {
    let id = '123456',
      player = { name: 'Byron' },
      stack = 100

    let seat = new Seat(id, player, stack)
    seat.fold()

    it(`sets seat's bet to 0`, () => {
      expect(seat.bet).to.be.equal(0)
    })
    it(`sets seat's folded flag to true`, () => {
      expect(seat.folded).to.be.true
    })
    it(`changes seat's last action to 'FOLD'`, () => {
      expect(seat.lastAction).to.be.equal('FOLD')
    })
    it(`sets seat's turn to false`, () => {
      expect(seat.turn).to.be.false
    })
  })
  
  describe('#check()', () => {
    let id = '123456',
      player = { name: 'Byron' },
      stack = 100

    let seat = new Seat(id, player, stack)
    seat.check()

    it(`sets seat's checked flag to true`, () => {
      expect(seat.checked).to.be.true
    })
    it(`changes seat's last action to 'CHECK'`, () => {
      expect(seat.lastAction).to.be.equal('CHECK')
    })
    it(`sets seat's turn to false`, () => {
      expect(seat.turn).to.be.false
    })
  })

  describe('#raise()', () => {
    let id = '123456',
      player = { name: 'Byron' },
      stack = 100

    let seat = new Seat(id, player, stack)
    seat.raise(20)

    it(`subtracts from the stack`, () => {
      expect(seat.stack).to.be.equal(80)
    })
    it(`sets seat's bet to the amount raised`, () => {
      expect(seat.bet).to.be.equal(20)
    })
    it(`changes seat's last action to 'RAISE'`, () => {
      expect(seat.lastAction).to.be.equal('RAISE')
    })
    it(`sets seat's turn to false`, () => {
      expect(seat.turn).to.be.false
    })
  })

  describe('#placeBlind()', () => {
    let id = '123456',
      player = { name: 'Byron' },
      stack = 100

    let seat = new Seat(id, player, stack)
    seat.placeBlind(5)
    
    it(`subtracts from the stack`, () => {
      expect(seat.stack).to.be.equal(95)
    })
    it(`does NOT change seat's last action`, () => {
      expect(seat.lastAction).to.be.equal(null)
    })
    it(`sets seat's bet to the amount raised`, () => {
      expect(seat.bet).to.be.equal(5)
    })
  })

  describe('#callRaise()', () => {
    let id = '123456',
      player = { name: 'Byron' },
      stack = 100

    let seat = new Seat(id, player, stack)
    seat.callRaise(50)

    it(`subtracts from the stack`, () => {
      expect(seat.stack).to.be.equal(50)
    })
    it(`sets seat's bet to the amount raised`, () => {
      expect(seat.bet).to.be.equal(50)
    })
    it(`changes seat's last action to 'CALL'`, () => {
      expect(seat.lastAction).to.be.equal('CALL')
    })
    it(`sets seat's turn to false`, () => {
      expect(seat.turn).to.be.false
    })
  })

  describe(`#callRaise() when amount is greater than seat's stack`, () => {

  })

  describe('#winHand()', () => {

  })
})