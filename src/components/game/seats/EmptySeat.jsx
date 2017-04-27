import React from 'react'

const EmptySeat = ({ seatId, onSeatClick }) => (
  <div onClick={onSeatClick} className="seat-info">
    <div className="seat-number">{seatId}</div>
    <div className="seat-open">SIT HERE</div>
  </div>
)

export default EmptySeat
