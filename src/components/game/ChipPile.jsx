import React from 'react'
import Chips from './Chips'

const ChipPile = ({ amount }) => {
  let leftover = amount
  let tenDollarChips, oneDollarChips, tenCentChips, fiveCentChips

  if (leftover >= 10) {
    tenDollarChips = Math.floor(leftover / 10)
    leftover = leftover % 10
  }

  if (leftover >= 1) {
    oneDollarChips = Math.floor(leftover / 1)
    leftover = leftover % 1
  }

  tenCentChips = Math.floor(leftover / 0.10)
  leftover = leftover % 0.10

  fiveCentChips = leftover == 0.05 ? 1 : 0

  return (
    <div className="chip-pile">
      <Chips number={tenDollarChips} color={'purple'} />
      <Chips number={oneDollarChips} color={'red'} />
      <Chips number={tenCentChips} color={'blue'} />
      <Chips number={fiveCentChips} color={'white'} />
    </div>
  )
}

export default ChipPile