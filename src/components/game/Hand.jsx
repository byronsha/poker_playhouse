import React from 'react'

class Hand extends React.Component {
  getSuitColor = suit => {
    switch(suit) {
      case 'spades':
        return { color: 'black' }
      case 'diamonds':
        return { color: 'blue' }
      case 'hearts':
        return { color: 'red' }
      case 'clubs':
        return { color: 'green' }
      default:
        return { color: 'black' }
    }
  }

  render() {
    const suits = {
      'spades': '♠',
      'diamonds': '♦',
      'hearts': '♥',
      'clubs': '♣'
    }

    const ranks = {
      'ace': 'A',
      'king': 'K',
      'queen': 'Q',
      'jack': 'J' 
    }

    const { seat } = this.props

    return (
      <div className="hand">
        <div className="card" style={this.getSuitColor(seat.hand[0].suit)}>
          <div>{ranks[seat.hand[0].rank] ? ranks[seat.hand[0].rank] : seat.hand[0].rank}</div>
          <div>{suits[seat.hand[0].suit]}</div>
        </div>
        <div className="card" style={this.getSuitColor(seat.hand[1].suit)}>
          <div>{ranks[seat.hand[1].rank] ? ranks[seat.hand[1].rank] : seat.hand[1].rank}</div>
          <div>{suits[seat.hand[1].suit]}</div>
        </div>
      </div>
    )
  }
}

export default Hand