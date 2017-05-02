var expect = require('chai').expect
var should = require('chai').should()
var Deck = require('../game_logic/deck')

describe("Test the behavior of Deck", function () {
  it('should initialize with 52 cards', function () {
    let deck = new Deck()

    expect(deck.count()).to.be.equal(52)
  })
})