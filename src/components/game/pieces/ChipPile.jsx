import React from 'react'
import ChipStack from './ChipStack'

const ChipPile = ({ amount }) => {
  const purple = '#6a1b9a'
  const red = '#d32f2f'
  const blue = '#2962ff'
  const white = '#eee'
  const orange = '#ff9800'
  const cyan = '#4dd0e1'
  const grey = '#2a2a2a'

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
        <ChipStack number={tenDollarChips} color={purple} />
      }
      {oneDollarChips > 0 &&
        <ChipStack number={oneDollarChips} color={red} />
      }
      {tenCentChips > 0 &&
        <ChipStack number={tenCentChips} color={grey} />
      }
      {fiveCentChips > 0 &&
        <ChipStack number={fiveCentChips} color={white} />
      }
    </div>
  )
}

export default ChipPile