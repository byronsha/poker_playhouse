import React from 'react'

class Card extends React.Component {
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

    const { card } = this.props

    if (card.rank === '0') {
      return <div className="card-silhouette"></div>
    } else if (card.rank === 'hidden') {
      return <div className="card"><div className="card-back"></div></div>
    } else {
      return (
        <div className="card" style={this.getSuitColor(card.suit)}>
          <div>{ranks[card.rank] ? ranks[card.rank] : card.rank}</div>
          <div>{suits[card.suit]}</div>
        </div>
      )
    }
  }
}

export default Card