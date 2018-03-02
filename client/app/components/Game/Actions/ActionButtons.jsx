// @flow
import React from 'react'
import Button from 'material-ui/Button'
import { withStyles, createStyleSheet } from 'material-ui/styles'

const styleSheet = createStyleSheet('ActionButtons', () => ({
  container: {
    display: 'flex'
  },
  button: {
    flex: 1,
    color: '#fff',
    margin: '3px',
    height: '80px',
    padding: '0px 20px',
    fontSize: '16px',
    fontFamily: 'Montserrat, sans-serif',
  }
}))

type Seat = {
  id: number,
  bet: number,
  stack: number,
}
type Table = {
  id: number,
  seats: {
    [id: string]: Seat,
  },
  pot: number,
  callAmount: number,
}
type Props = {
  seat: Seat,
  table: Table,
  raiseAmount: number,
  totalCallAmount: number,
  handleFoldClick: () => void,
  handleCheckClick: () => void,
  handleCallClick: () => void,
  handleRaiseClick: () => void,
  classes: Object,
}
const ActionButtons = ({
  seat,
  table,
  raiseAmount,
  totalCallAmount,
  handleFoldClick,
  handleCheckClick,
  handleCallClick,
  handleRaiseClick,
  classes
}: Props) => {
  const players = Object.keys(table.seats).map(id => table.seats[id])
  const notAllInPlayers = players.filter(tableSeat =>
    tableSeat && tableSeat.stack > 0
  )
  const othersAllIn = notAllInPlayers.length === 1
    && notAllInPlayers[0].id === seat.id

  return (
    <div className={classes.container}>
      {table.callAmount &&
        <Button
          raised
          color="accent"
          className={classes.button}
          onClick={handleFoldClick}>
          Fold
        </Button>
      }

      {((!table.callAmount || seat.bet === table.callAmount) && seat.stack > 0) &&
        <Button
          raised
          color="accent"
          className={classes.button}
          onClick={handleCheckClick}>
          Check
        </Button>
      }

      {(table.callAmount > 0 && seat.bet !== table.callAmount) &&
        <Button
          raised
          color="accent"
          className={classes.button}
          onClick={handleCallClick}>
          Call ${(totalCallAmount).toFixed(2)}
        </Button>  
      }

      {((seat.stack > table.callAmount) && !othersAllIn) &&
        <Button
          raised
          color="accent"
          className={classes.button}
          onClick={handleRaiseClick}>
          Raise to ${parseFloat(raiseAmount).toFixed(2)}
        </Button>
      }
    </div>
  )
}

export default withStyles(styleSheet)(ActionButtons)