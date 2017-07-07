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
  // deal with floating point numbers
  let cents = amount * 100

  let tenDollarChips,
      oneDollarChips,
      fiftyCentChips,
      tenCentChips,
      fiveCentChips,
      oneCentChips

  tenDollarChips = Math.floor(cents / 1000)
  cents -= tenDollarChips * 1000

  oneDollarChips = Math.floor(cents / 100)
  cents -= oneDollarChips * 100

  fiftyCentChips = Math.floor(cents / 50)
  cents -= fiftyCentChips * 50

  tenCentChips = Math.floor(cents / 10)
  cents -= tenCentChips * 10

  fiveCentChips = Math.floor(cents / 5)
  cents -= fiveCentChips * 5

  oneCentChips = Math.round(cents)

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