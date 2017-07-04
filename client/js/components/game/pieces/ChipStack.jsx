import React from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'

const styleSheet = createStyleSheet('ChipStack', theme => ({
  chip: {
    width: '20px',
    height: '3px',
    margin: '1px 3px',
  }
}))

const ChipStack = ({
  number,
  color,
  classes
}) => {
  const chips = Array.from(Array(number).keys()).map(num => (
    <div
      key={num}
      className={classes.chip}
      style={{ background: color }}>
    </div>
  ))

  if (number > 0) {
    return <div>{chips}</div>
  } else {
    return <div></div>
  }
}

export default withStyles(styleSheet)(ChipStack)