import React from 'react'
import ChipPile from '../Pieces/ChipPile'

type Props = {
  seat: {
    bet: number,
    turn: boolean,
    lastAction: ?string,
  }
}
const Bet = ({ seat }: Props) => (
  <div className="bet">
    <ChipPile amount={seat.bet} />
    <span>
      {seat.lastAction && !seat.turn &&
        <span>{seat.lastAction + ' - '}</span>
      }
      ${seat.bet.toFixed(2)}
    </span>
  </div>
)

export default Bet