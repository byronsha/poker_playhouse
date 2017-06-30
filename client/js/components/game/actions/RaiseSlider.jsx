import React from 'react'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Input from 'material-ui/Input/Input'
import { withStyles, createStyleSheet } from 'material-ui/styles'

const styleSheet = createStyleSheet('RaiseSlider', theme => ({
  button: {
    width: '36px',
    height: '36px',
    margin: '12px'
  },
  icon: {
    position: 'relative',
    color: '#fff'
  },
  container: {
    color: '#333',
  },
  slider: {
    width: '40%'
  },
  input: {
    width: '25%',
    display: 'inline-block'
  }
}))

const RaiseSlider = ({
  raiseAmount,
  decreaseRaiseAmount,
  increaseRaiseAmount,
  onRaiseChange,
  table,
  seat,
  classes
}) => {
  const maxBet = seat.stack + seat.bet
  const minRaise = table.minRaise > maxBet ? maxBet : table.minRaise

  return (
    <div className={classes.container}>
      <Button
        fab
        color="primary"
        className={classes.button}
        onClick={decreaseRaiseAmount}>
        <AddIcon className={classes.icon} />
      </Button>

      <span>${minRaise.toFixed(2)}</span>

      <input
        type="range"
        className={classes.slider}
        min={minRaise.toFixed(2)}
        max={maxBet.toFixed(2)}
        value={raiseAmount}
        step={table.minBet.toFixed(2)}
        onInput={onRaiseChange}
        onChange={onRaiseChange}
      >
      </input>

      <span>${maxBet.toFixed(2)}</span>

      <Button
        fab
        color="primary"
        className={classes.button}
        onClick={increaseRaiseAmount}>
        <AddIcon className={classes.icon} />
      </Button>

      <Input
        type="number"
        className={classes.input}
        onChange={onRaiseChange} />
    </div>
  )
}

export default withStyles(styleSheet)(RaiseSlider)