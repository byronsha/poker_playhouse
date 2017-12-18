var expect = require('chai').expect
var should = require('chai').should()
var Seat = require('../seat')

describe('Seat', function() {
  const id = '123456'
  const player = { name: 'Byron' }

  describe('initialization', () => {
    const seat = new Seat(id, player, 100, 100)

    it('has correct id', () => {
      expect(seat.id).to.be.equal('123456')
    })
    it('has correct player', () => {
      expect(seat.player).to.have.property('name', 'Byron')
    })
    it('has correct stack', () => {
      expect(seat.stack).to.be.equal(100)
    })
    it('has correct buyin', () => {
      expect(seat.buyin).to.be.equal(100)
    })
  })

  describe('#fold()', () => {
    const seat = new Seat(id, player, 100, 100)
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
    const seat = new Seat(id, player, 100, 100)
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

  describe('#raise(amount)', () => {
    const seat = new Seat(id, player, 100, 100)
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

    it(`cannot raise more than it's stack`, () => {
      seat.raise(110)
      expect(seat.bet).to.be.equal(20)
    })
  })

  describe('#placeBlind(amount)', () => {
    const seat = new Seat(id, player, 100, 100)
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

  describe('#callRaise(amount) [amount <= stack]', () => {
    const seat = new Seat(id, player, 100, 100)
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

  describe(`#callRaise(amount) [amount > stack]`, () => {
    const seat = new Seat(id, player, 100, 100)
    seat.callRaise(200)

    it(`sets seat's stack to 0 - all in`, () => {
      expect(seat.stack).to.be.equal(0)
    })
    it(`sets seat's bet to remaining stack`, () => {
      expect(seat.bet).to.be.equal(100)
    })
  })

  describe('#winHand(amount)', () => {
    const seat = new Seat(id, player, 100, 100)
    seat.winHand(125)

    it(`adds won amount to stack`, () => {
      expect(seat.stack).to.be.equal(225)
    })
    it(`sets seat's bet to 0`, () => {
      expect(seat.bet).to.be.equal(0)
    })
    it(`changes seat's last action to 'WINNER'`, () => {
      expect(seat.lastAction).to.be.equal('WINNER')
    })
    it(`sets seat's turn to false`, () => {
      expect(seat.turn).to.be.false
    })
  })
})