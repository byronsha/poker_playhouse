import React from 'react'
import ChipStack from './ChipStack'

const ChipPile = ({ amount }) => {
  const purple = '#6a1b9a'
  const red = '#c62828'
  const blue = '#1565c0'
  const white = '#eee'
  const orange = '#ff9800'
  const cyan = '#4dd0e1'

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

  fiveCentChips = parseFloat(leftover.toFixed(2)) === 0.05 ? 1 : 0

  return (
    <div className="chip-pile">
      {tenDollarChips > 0 &&
        <ChipStack number={tenDollarChips} color={red} />
      }
      {oneDollarChips > 0 &&
        <ChipStack number={oneDollarChips} color={orange} />
      }
      {tenCentChips > 0 &&
        <ChipStack number={tenCentChips} color={purple} />
      }
      {fiveCentChips > 0 &&
        <ChipStack number={fiveCentChips} color={cyan} />
      }
    </div>
  )
}

export default ChipPile