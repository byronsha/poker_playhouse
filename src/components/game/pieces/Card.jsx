import React from 'react'

class Card extends React.Component {
  getSuitColor = suit => {
    switch(suit) {
      case 'spades':
        return { background: 'black' }
      case 'diamonds':
        return { background: '#2196f3' }
      case 'hearts':
        return { background: '#f44336' }
      case 'clubs':
        return { background: '#4caf50' }
      default:
        return { background: '#212121' }
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
      'jack': 'J',
      '10': 'T'
    }

    const { card } = this.props

    if (card.rank === '0') {
      return <div className="card-silhouette"></div>
    } else if (card.rank === 'hidden') {
      return <div className="card"><div className="card-back"></div></div>
    } else {
      return (
        <div className="card" style={this.getSuitColor(card.suit)}>
          <div className="small-picture">
            <div>{ranks[card.rank] ? ranks[card.rank] : card.rank}</div>
            <div>{suits[card.suit]}</div>
          </div>
          <div className="big-picture">{ranks[card.rank] ? ranks[card.rank] : card.rank}</div>
        </div>
      )
    }
  }
}

export default Card