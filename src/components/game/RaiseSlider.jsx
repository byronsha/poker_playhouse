import React from 'react'

const RaiseSlider = ({ raiseAmount, onRaiseChange, table, seat }) => (
  <div className="raise-slider">
    ${table.minRaise.toFixed(2)}
    <input
      type="range"
      min={table.minRaise.toFixed(2)}
      max={(seat.stack + seat.bet).toFixed(2)}
      value={raiseAmount}
      step={table.minBet.toFixed(2)}
      onInput={onRaiseChange}
      onChange={onRaiseChange}
    >
    </input>
    ${(seat.stack + seat.bet).toFixed(2)}
  </div>
)

export default RaiseSlider