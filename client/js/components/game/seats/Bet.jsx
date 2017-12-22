import React from 'react'
import ChipPile from '../Pieces/ChipPile'

const Bet = ({ seat }) => (
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