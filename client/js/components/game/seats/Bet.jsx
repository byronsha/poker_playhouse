import React from 'react'
import ChipPile from '../pieces/ChipPile'

const Bet = ({ bet }) => (
  <div className="bet">
    <ChipPile amount={bet} />
    <span>${bet.toFixed(2)}</span>
  </div>
)

export default Bet