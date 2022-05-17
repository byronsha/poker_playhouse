// @flow
import React from 'react'
import { css } from 'emotion'
import Paper from 'material-ui/Paper'
import {
  red,
  grey,
  blue,
  green
} from 'material-ui/styles/colors'

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
const smallCard = css`padding: 4px 2px; margin: 0 4px; display: inline-block; font-size: 32px;`
const smallCardInner = css`display: flex`

const getSuitColor = suit => {
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

type Props = {
  card: {
    rank: string,
    suit: string,
  },
  small?: boolean,
}
function Card(props: Props) {
  const { card } = props

  if (card.rank === '0') {
    return <div className="card-silhouette"></div>
  } else if (card.rank === 'hidden') {
    return <Paper className="card"><div className="card-back"></div></Paper>
  } else {
    return (
      <Paper className={props.small ? smallCard : "card"} elevation={4}>
        <div className={props.small ? smallCardInner : "small-picture"} style={getSuitColor(card.suit)}>
          <div>{ranks[card.rank] ? ranks[card.rank] : card.rank}</div>
          <div>{suits[card.suit]}</div>
        </div>
        {!props.small &&
          <div className="big-picture" style={getSuitColor(card.suit)}>
            {ranks[card.rank] ? ranks[card.rank] : card.rank}
          </div>
        }
      </Paper>
    )
  }
}

export default Card