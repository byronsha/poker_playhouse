import React from 'react'

const EmptySeat = ({ seatId, onSeatClick }) => (
  <div onClick={onSeatClick} className="seat-info">
    <div className="seat-stack">
      <div>$0.00</div>
    </div>

    <div>
      <div className="seat-number">{seatId}</div>
      <div>SIT HERE</div>
    </div>
  </div>
)

export default EmptySeat
