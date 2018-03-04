// @flow
import React from 'react'
import Paper from 'material-ui/Paper'
import { blueGrey, cyan } from 'material-ui/styles/colors'

type Props = {
  seatId: string,
  onSeatClick: () => void
}
const EmptySeat = ({ seatId, onSeatClick }: Props) => (
  <Paper onClick={onSeatClick} className="seat-info" style={{ borderRadius: '4px' }}>
    <div className="seat-stack" style={{ background: blueGrey[900] }}>
      SIT HERE
    </div>

    <div>
      <div className="seat-number" style={{ color: '#ccc', background: cyan[600] }}>{seatId}</div>
      <div className="seat-player" style={{ color: '#ccc', background: cyan[900] }}>$0.00</div>
    </div>
  </Paper>
)

export default EmptySeat
