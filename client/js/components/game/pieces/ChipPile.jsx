import React from 'react'
import ChipStack from './ChipStack'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import { red, green, purple, orange } from 'material-ui/styles/colors'

const styleSheet = createStyleSheet('ChipPile', theme => ({
  chipPile: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  }
}))

const ChipPile = ({ amount, classes }) => {
  let leftover = amount
  let tenDollarChips,
      oneDollarChips,
      fiftyCentChips,
      tenCentChips,
      fiveCentChips,
      oneCentChips

  tenDollarChips = Math.floor(leftover / 10)
  leftover = Math.round(leftover % 10 * 100)/100

  oneDollarChips = Math.floor(leftover / 1)
  leftover = Math.round(leftover % 1 * 100)/100

  fiftyCentChips = Math.floor(leftover / 0.5)
  leftover = Math.round(leftover % 0.5 * 100)/100

  tenCentChips = Math.floor(leftover / 0.1)
  leftover = Math.round(leftover % 0.1 * 100)/100

  fiveCentChips = Math.floor(leftover / 0.05)
  leftover = Math.round(leftover % 0.05 * 100)/100

  oneCentChips = Math.round(leftover / 0.01)

  return (
    <div className={classes.chipPile}>
      {tenDollarChips > 0 &&
        <ChipStack number={tenDollarChips} color={orange[500]} />
      }
      {oneDollarChips > 0 &&
        <ChipStack number={oneDollarChips} color={purple[500]} />
      }
      {fiftyCentChips > 0 &&
        <ChipStack number={fiftyCentChips} color={green[500]} />
      }
      {tenCentChips > 0 &&
        <ChipStack number={tenCentChips} color={red[500]} />
      }
      {fiveCentChips > 0 &&
        <ChipStack number={fiveCentChips} color={'#222'} />
      }
      {oneCentChips > 0 &&
        <ChipStack number={oneCentChips} color={'#eee'} />
      }
    </div>
  )
}

export default withStyles(styleSheet)(ChipPile)