import React from 'react'
import Paper from 'material-ui/Paper'
import {
  red,
  grey,
  blue,
  green
} from 'material-ui/styles/colors'

class Card extends React.Component {
  getSuitColor = suit => {
    switch(suit) {
      case 'spades':
        return { color: grey[900] }
      case 'diamonds':
        return { color: blue[500] }
      case 'hearts':
        return { color: red[500] }
      case 'clubs':
        return { color: green[500] }
      default:
        return { color: 'purple' }
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
      return <Paper className="card"><div className="card-back"></div></Paper>
    } else {
      return (
        <Paper className="card" elevation={4}>
          <div className="small-picture" style={this.getSuitColor(card.suit)}>
            <div>{ranks[card.rank] ? ranks[card.rank] : card.rank}</div>
            <div>{suits[card.suit]}</div>
          </div>
          <div className="big-picture" style={this.getSuitColor(card.suit)}>{ranks[card.rank] ? ranks[card.rank] : card.rank}</div>
        </Paper>
      )
    }
  }
}

export default Card