import React from 'react'
import Paper from 'material-ui/Paper'
import { blueGrey, cyan } from 'material-ui/styles/colors'

const EmptySeat = ({ seatId, onSeatClick }) => (
  <Paper onClick={onSeatClick} className="seat-info">
    <div className="seat-stack" style={{background: blueGrey[900]}}>
      SIT DOWN
    </div>

    <div>
      <div className="seat-number" style={{background: cyan[600]}}>{seatId}</div>
      <div className="seat-player" style={{background: cyan[900]}}>.</div>
    </div>
  </Paper>
)

export default EmptySeat
