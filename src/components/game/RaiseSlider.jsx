import React from 'react'

const RaiseSlider = ({ raiseAmount, onRaiseChange, table, seat }) => {
  const maxBet = seat.stack + seat.bet
  const minRaise = table.minRaise > maxBet ? maxBet : table.minRaise

  return (
    <div className="raise-slider">
      ${minRaise.toFixed(2)}
      <input
        type="range"
        min={minRaise.toFixed(2)}
        max={maxBet.toFixed(2)}
        value={raiseAmount}
        step={table.minBet.toFixed(2)}
        onInput={onRaiseChange}
        onChange={onRaiseChange}
      >
      </input>
      ${maxBet.toFixed(2)}
    </div>
  )
}

export default RaiseSlider