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

  describe('when comparing hands', () => {
    let handA;
    let handB;
    let handAScore;
    let handBScore;

    describe('a straight versus two pair', () => {
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

      it('the straight has a higher score', () => {
        expect(handAScore.value).to.be.above(handBScore.value)
      })
    })

    describe('a flush versus a straight', () => {
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

      it('the flush has a higher score', () => {
        expect(handAScore.value).to.be.above(handBScore.value)
      })
    })
  })
})