import React from 'react'

const RaiseSlider = ({
  raiseAmount, decreaseRaiseAmount, increaseRaiseAmount,
  onRaiseChange, table, seat
}) => {
  const maxBet = seat.stack + seat.bet
  const minRaise = table.minRaise > maxBet ? maxBet : table.minRaise

  return (
    <div className="raise-slider">
      <button onClick={decreaseRaiseAmount}>-</button>
      <span>${minRaise.toFixed(2)}</span>
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
      <span>${maxBet.toFixed(2)}</span>
      <button onClick={increaseRaiseAmount}>+</button>
    </div>
  )
}

export default RaiseSlider