var expect = require('chai').expect
var should = require('chai').should()
var Deck = require('../game_logic/deck')

describe('Deck', () => {
  describe('#count()', () => {
    it('should initialize with 52 cards', () => {
      let deck = new Deck()

      expect(deck.count()).to.be.equal(52)
    })
  })

  describe('#draw()', () => {
    it('should return a card', () => {
      let deck = new Deck()
      let card = deck.draw()
      
      expect(card).to.have.property('suit')
      expect(card).to.have.property('rank')
    })
  })
})