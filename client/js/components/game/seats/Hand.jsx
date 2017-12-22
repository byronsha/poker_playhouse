// @flow
import React from 'react'
import Card from '../Pieces/Card'

type Props = {
  seat: {
    hand: Array<{
      rank: string,
      suit: string,
    }>,
  },
}
function Hand(props: Props) {
  return (
    <div className="hand">
      <Card card={props.seat.hand[0]} />
      <Card card={props.seat.hand[1]} />
    </div>
  )
}

export default Hand