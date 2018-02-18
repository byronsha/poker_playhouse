var expect = require('chai').expect

var PokerHand = require('../pokerhand')

describe('PokerHand', () => {
  const board = [
    { rank: '9', suit: 'clubs' },
    { rank: '10', suit: 'spades' },
    { rank: 'jack', suit: 'spades' },
    { rank: 'queen', suit: 'spades' },
    { rank: 'queen', suit: 'diamonds' },
  ]

  const pairedBoard = [
    { rank: '3', suit: 'clubs' },
    { rank: '5', suit: 'hearts' },
    { rank: 'jack', suit: 'hearts' },
    { rank: 'ace', suit: 'spades' },
    { rank: 'ace', suit: 'diamonds' },
  ]

  describe('when comparing hands', () => {
    let handA;
    let handB;
    let handAScore;
    let handBScore;

    describe('straight vs two pair', () => {
      beforeEach(() => {
        handA = [
          { rank: 'ace', suit: 'hearts' },
          { rank: 'king', suit: 'hearts' },
        ];
        handB = [
          { rank: 'jack', suit: 'hearts' },
          { rank: '2', suit: 'hearts' },
        ];
        handAScore = PokerHand.score(handA, board)
        handBScore = PokerHand.score(handB, board)
      })

      it('straight wins', () => {
        expect(handAScore.value).to.be.above(handBScore.value)
      })
    })

    describe('two pair vs higher two pair', () => {
      beforeEach(() => {
        handA = [
          { rank: 'queen', suit: 'hearts' },
          { rank: '5', suit: 'clubs' },
        ];
        handB = [
          { rank: 'jack', suit: 'clubs' },
          { rank: '5', suit: 'spades' },
        ];
        handAScore = PokerHand.score(handA, pairedBoard)
        handBScore = PokerHand.score(handB, pairedBoard)
      })

      it('higher 2 pair wins', () => {
        expect(handBScore.value).to.be.above(handAScore.value)
      })
    })

    describe('flush vs straight', () => {
      beforeEach(() => {
        handA = [
          { rank: 'ace', suit: 'spades' },
          { rank: '2', suit: 'spades' },
        ];
        handB = [
          { rank: 'ace', suit: 'hearts' },
          { rank: 'king', suit: 'hearts' },
        ];
        handAScore = PokerHand.score(handA, board)
        handBScore = PokerHand.score(handB, board)
      })

      it('flush wins', () => {
        expect(handAScore.value).to.be.above(handBScore.value)
      })
    })
  })
})