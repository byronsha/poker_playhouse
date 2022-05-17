import React from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'

const styleSheet = createStyleSheet('ChipStack', () => ({
  chip: {
    width: '20px',
    height: '3px',
    margin: '1px 3px',
  }
}))

type Props = {
  number: number,
  color: string,
  classes: Object,
}
const ChipStack = ({
  number,
  color,
  classes
}: Props) => {
  if (number === 0) {
    return null
  }

  const chips = Array.from(Array(parseInt(number)).keys()).map(num => (
    <div
      key={num}
      className={classes.chip}
      style={{ background: color }}>
    </div>
  ))

  return <div>{chips}</div>
}

export default withStyles(styleSheet)(ChipStack)