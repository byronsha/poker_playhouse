import React from 'react'
import Button from 'material-ui/Button'
import { withStyles, createStyleSheet } from 'material-ui/styles'

const styleSheet = createStyleSheet('Actions', theme => ({
  button: {
    flex: 1,
    margin: '3px',
    padding: '0px',
    minWidth: '0px',
    fontSize: '12px',
  }
}))

const PotSizeButton = ({ text, onRaiseClick, classes }) => (
  <Button
    raised
    className={classes.button}
    color="primary"
    onClick={onRaiseClick}>
    {text}
  </Button>
)

export default withStyles(styleSheet)(PotSizeButton)

