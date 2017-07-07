var expect = require('chai').expect
var should = require('chai').should()
var Table = require('../table')
var Seat = require('../seat')
var Player = require('../player')

describe('Table', function() {
  describe('initialization', () => {
    const table = new Table(1, 'Test Table', 6, 100)

    it('has correct id', () => {
      expect(table.id).to.be.equal(1)
    })
    it('has correct name', () => {
      expect(table).to.have.property('name', 'Test Table')
    })
    it('has correct max number of players', () => {
      expect(table.maxPlayers).to.be.equal(6)
    })
    it('initializes the seats object', () => {
      expect(table.seats).to.have.property('1', null)
      expect(table.seats).to.have.property('2', null)
      expect(table.seats).to.have.property('3', null)
      expect(table.seats).to.have.property('4', null)
      expect(table.seats).to.have.property('5', null)
      expect(table.seats).to.have.property('6', null)
    })
  })

  describe('#addPlayer(player)', () => {
    const table = new Table(1, 'Test Table', 6, 100)
    const player = new Player('9988', 'Byron', 1000)
    table.addPlayer(player)

    it('adds the player to the players array', () => {
      expect(table.players).to.have.lengthOf(1)
      expect(table.players[0]).to.have.property('socketId', '9988')
      expect(table.players[0]).to.have.property('name', 'Byron')
      expect(table.players[0]).to.have.property('bankroll', 1000)
    })
  })

  describe('#sitPlayer(player, seatId)', () => {
    const table = new Table(1, 'Test Table', 6, 100)
    const player1 = new Player('9988', 'Byron', 1000)
    const player2 = new Player('7766', 'Jim', 500)
    table.sitPlayer(player1, 6)

    it('adds a new Seat to its seats object', () => {
      expect(table.seats[6]).to.have.property('id', 6)
      expect(table.seats[6].player).to.have.property('socketId', '9988')
      expect(table.seats[6].player).to.have.property('name', 'Byron')
      expect(table.seats[6].player).to.have.property('bankroll', 1000)
    })
    it('starts with a stack of 100 BBs', () => {
      expect(table.seats[6]).to.have.property('stack', 100)
    })
    it('does nothing for occupied seats', () => {
      table.sitPlayer(player2, 6)
      expect(table.seats[6].player).to.have.property('socketId', '9988')
      expect(table.seats[6].player).to.have.property('name', 'Byron')
      expect(table.seats[6].player).to.have.property('bankroll', 1000)
    })
  })

  describe('#standPlayer(socketId)', () => {
    const table = new Table(1, 'Test Table', 6, 100)
    const player = new Player('9988', 'Byron', 1000)
    table.sitPlayer(player, 6)
    table.standPlayer('9988')

    it('sets seat with matching player socket id to null', () => {
      expect(table.seats[6]).to.be.equal(null)
    })
  })

  describe('#removePlayer(socketId)', () => {
    const table = new Table(1, 'Test Table', 6, 100)
    const player = new Player('9988', 'Byron', 1000)
    table.addPlayer(player)
    table.sitPlayer(player, 3)
    table.removePlayer('9988')

    it('removes player with matching socket id from players array', () => {
      expect(table.players.filter(player => player.socketId === '9988')).to.have.lengthOf(0)
    })
    it('sets seat with matching player socket id to null', () => {
      expect(table.seats[3]).to.be.equal(null)
    })
    it('resets the table properties when the last player leaves', () => {
      expect(table.players).to.have.lengthOf(0)
      expect(table.board).to.have.lengthOf(0)
      expect(table.deck).to.be.equal(null)
      expect(table.button).to.be.equal(null)
      expect(table.turn).to.be.equal(null)
      expect(table.pot).to.be.equal(0)
      expect(table.mainPot).to.be.equal(0)
      expect(table.callAmount).to.be.equal(null)
      expect(table.minBet).to.be.equal(table.limit / 200)
      expect(table.minRaise).to.be.equal(table.limit / 100)
      expect(table.smallBlind).to.be.equal(null)
      expect(table.bigBlind).to.be.equal(null)
      expect(table.handOver).to.be.true
      expect(table.winMessages).to.have.lengthOf(0)
      expect(table.wentToShowdown).to.be.false
    })
    it('resets the seats when the last player leaves', () => {
      for (let seat of Object.values(table.seats)) {
        expect(seat).to.be.equal(null)
      }
    })
  })
})