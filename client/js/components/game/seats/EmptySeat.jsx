import React from 'react'
import Paper from 'material-ui/Paper'

const EmptySeat = ({ seatId, onSeatClick }) => (
  <Paper onClick={onSeatClick} className="seat-info">
    <div className="seat-stack">
      <div>SIT DOWN</div>
    </div>

    <div>
      <div className="seat-number">{seatId}</div>
      <div>.</div>
    </div>
  </Paper>
)

export default EmptySeat
