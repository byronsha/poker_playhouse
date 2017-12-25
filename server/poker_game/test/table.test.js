var expect = require('chai').expect

var Table = require('../table')
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
    const player = new Player('9988', 1, 'Byron', 1000)
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
    const player1 = new Player('9988', 1, 'Byron', 1000)
    const player2 = new Player('7766', 2, 'Jim', 500)
    table.sitPlayer(player1, 6)

    it('adds a new Seat to its seats object', () => {
      expect(table.seats[6]).to.have.property('id', 6)
      expect(table.seats[6].player).to.have.property('socketId', '9988')
      expect(table.seats[6].player).to.have.property('name', 'Byron')
      expect(table.seats[6].player).to.have.property('bankroll', 1000)
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
    const player = new Player('9988', 1, 'Byron', 1000)
    table.sitPlayer(player, 6)
    table.standPlayer('9988')

    it('sets seat with matching player socket id to null', () => {
      expect(table.seats[6]).to.be.equal(null)
    })
  })

  describe('#removePlayer(socketId)', () => {
    const table = new Table(1, 'Test Table', 6, 100)
    const player = new Player('9988', 1, 'Byron', 1000)
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

  describe('Sitting out', () => {
    let table
    let player1
    let player2
    let player3

    beforeEach(() => {
      table = new Table(1, 'Test table', 6, 10)
      player1 = new Player(1, 1, 'Player 1', 10)
      player2 = new Player(2, 2, 'Player 2', 10)
      player3 = new Player(3, 3, 'Player 3', 10)
  
      table.sitPlayer(player1, 1, 10)
      table.sitPlayer(player2, 2, 10)
      table.sitPlayer(player3, 3, 10)
    })

    describe('when a new hand starts', () => {
      beforeEach(() => {
        table.seats[1].folded = false
        table.seats[1].sittingOut = true
        table.startHand()
      })

      it('does not deal in the sitting out player', () => {
        expect(table.seats[1].hand).to.have.lengthOf(0)
        expect(table.seats[1].folded).to.be.true
      })
      it('deals in the other players', () => {
        expect(table.seats[2].hand).to.have.lengthOf(2)
        expect(table.seats[3].hand).to.have.lengthOf(2)

        expect(table.seats[2].folded).to.be.false
        expect(table.seats[3].folded).to.be.false
      })
    })

    describe('when only 1 player is active', () => {
      beforeEach(() => {
        table.seats[1].sittingOut = true
        table.seats[2].sittingOut = true
        table.startHand()
      })

      it('does not start the hand', () => {
        expect(table.board).to.have.lengthOf(0)
        expect(table.handOver).to.be.true
      })
    })

    describe('when in the middle of a hand', () => {
      beforeEach(() => {
        table.startHand()
        table.seats[1].sittingOut = true
        table.seats[2].sittingOut = true
        table.seats[3].sittingOut = true
      })

      it('allows the sitting out player to finish the current hand', () => {
        expect(table.seats[1].hand).to.have.lengthOf(2)
        expect(table.seats[1].folded).to.be.false
        expect(table.unfoldedPlayers()).to.have.lengthOf(3)
        expect(table.turn).to.be.equal(2)
      })
    })
    
    describe('when changing turns', () => {
      beforeEach(() => {
        table.startHand()
        table.seats[3].sittingOut = true
        table.changeTurn(table.turn)
      })
      
      it('changes turns to the sitting out player', () => {
        expect(table.nextUnfoldedPlayer(2, 1)).to.be.equal(3)
        expect(table.turn).to.be.equal(3)
      })
      
      it('the hand is not over', () => {
        expect(table.handOver).to.be.false
      })
    })
  })
})